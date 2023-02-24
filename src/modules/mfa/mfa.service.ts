import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';

import { NoChangesException } from 'src/exceptions/no-changes.exception';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { UserIdentifierDto } from '../users/dto/user-identifier-dto';
import { UserWithoutSecretsDto } from '../users/dto/user-without-secrets-dto';
import { OTPNotValidException } from 'src/exceptions/otp-not-valid.exception';
import { No2faSecretException } from 'src/exceptions/no-2fa-secret.exception';
import { OtpService } from '../otp/otp.service';
import { RememberMfaService } from '../remember-mfa/remember-mfa.service';
import { OTPNotFoundException } from 'src/exceptions/otp-not-found.exception';

@Injectable()
export class MfaService {

  constructor(private usersService: UsersService,
    private configService: ConfigService,
    private otpService: OtpService,
    private rememberMfaService: RememberMfaService) { }

  async validateMfa(user: UserEntity, remember2faToken: string, otp: string, remember2fa: string, res: Response): Promise<void> {
    // Checking for a remember2faToken first
    if (remember2faToken && await this.rememberMfaService.isRememberMfaTokenValid(remember2faToken, user)) {
      this.rememberMfaService.setNewRememberMfaCookie(res, user);
      this.rememberMfaService.removeRememberMfaValidator(remember2faToken);
      return;
    };
    // No valid remember2faToken, now check for otp
    if (!otp) {
      console.log('No OTP found.');
      throw new OTPNotFoundException();
    } else if (await this.otpService.isOtpValid(otp, user)) {
      console.log('Remember2fa value in the request was set to', remember2fa);
      if (remember2fa === 'true') {
        this.rememberMfaService.setNewRememberMfaCookie(res, user);
      }
      return;
    } else {
      throw new OTPNotValidException();
    }
  }

  async enableMfa(user: UserEntity, otp: string): Promise<UserWithoutSecretsDto> {
    // const user = await this.usersService.findByUsername(username); // necessary?
    if (user.has2faEnabled) {
      console.log("Disabled");
      throw new NoChangesException('Two-factor authentication already enabled');
    }
    if (!user.mfaSecret) {
      throw new No2faSecretException();
    }
    if (!await this.otpService.isOtpValid(otp, user)) {
      throw new OTPNotValidException();
    } else {
      user.has2faEnabled = true;
      return this.usersService.save(user);
    }
  }

  async disableMfa(user: UserEntity, otp: string, res: Response): Promise<UserWithoutSecretsDto> {
    // const user = await this.usersService.findByUsername(username); // necessary?
    if (!user.has2faEnabled) {
      console.log("Disabled");
      throw new NoChangesException('Two-factor authentication already disabled');
    }
    if (!await this.otpService.isOtpValid(otp, user)) {
      throw new OTPNotValidException();
    } else {
      user.has2faEnabled = false;
      user.mfaSecret = null;
      this.rememberMfaService.removeAllRememberMfaValidatorsForUser(user);
      this.rememberMfaService.setClearRememberMfaCookie(res);
      return this.usersService.save(user);
    }
  }

  async setMfaSecret(secret: string, userId: number): Promise<UserWithoutSecretsDto> {
    const user = await this.usersService.findById(userId);
    console.log("Setting secret", secret, "for user", user.username);
    user.mfaSecret = secret;
    return this.usersService.save(user);
  }

  async generateMfaSecret(userIdentifier: UserIdentifierDto) {
    const user = await this.usersService.findById(userIdentifier.id);
    let secret = null;
    if (user.mfaSecret !== null && user.mfaSecret !== undefined && user.mfaSecret !== '') {
      console.log("User already has secret. Secret is", user.mfaSecret);
      secret = user.mfaSecret;
    } else {
      console.log("Generating secret for user", user.username);
      secret = authenticator.generateSecret();
      console.log("Generated secret is", secret);
      await this.setMfaSecret(secret, user.id);
    }
    const otpauthUrl = authenticator.keyuri(user.username, this.configService.get('TWO_FACTOR_AUTHENTICATION_APP_NAME'), secret);
    return {
      otpauthUrl
    }
  }

  async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
