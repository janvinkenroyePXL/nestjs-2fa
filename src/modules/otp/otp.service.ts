import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';

import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { OTPNotFoundException } from 'src/exceptions/otp-not-found.exception';

@Injectable()
export class OtpService {

  constructor(private usersService: UsersService) { }

  async isOtpValid(otp: string, user: UserEntity): Promise<boolean> {
    console.log('Validating OTP', otp, '...');
    // const user = await this.usersService.findById(authenticatedUser.id); // necessary??
    console.log('The mfaSecret of', user.username, ' is', user.mfaSecret);
    const otpValid = authenticator.verify({
      token: otp,
      secret: user.mfaSecret
    });
    if (!otpValid) {
      console.log('One-time password not valid.');
      return false;
    }
    console.log('One-time password valid.');
    return true;
  }
}
