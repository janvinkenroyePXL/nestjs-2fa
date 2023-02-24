import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { MfaService } from '../mfa/mfa.service';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mfaService: MfaService,
  ) { }

  async login(user: UserEntity, remember2faToken: string, otp: string, remember2fa: string, res: Response): Promise<any> {
    console.log('Trying to login user', user.username, '...');
    if (user.has2faEnabled) {
      console.log(user.username, 'has 2FA enabled');
      await this.mfaService.validateMfa(user, remember2faToken, otp, remember2fa, res);
    } else {
      console.log('2FA is not enabled for', user.username);
    }
    const payloadJwt = { username: user.username, sub: user.id };
    console.log('A Jwt token will be created and sent back. The token has the following payload:', payloadJwt);
    const { password, mfaSecret, roles, ...userProperties } = user;
    const userPayload = { ...userProperties, roles: roles.map(role => role.name)};
    console.log('The userpayload is:', userPayload);
    return {
      hash: this.jwtService.sign(payloadJwt),
      user: userPayload,
      success: true,
    };
  }
}
