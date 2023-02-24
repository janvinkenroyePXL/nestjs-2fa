import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { nanoid } from 'nanoid'

import { UserEntity } from '../users/user.entity';
import { RememberMfaValidatorEntity } from '../remember-mfa/remember-mfa-validator.entity';
import cookieConfig from 'src/config/cookie.config';

@Injectable()
export class RememberMfaService {

  constructor(@InjectRepository(RememberMfaValidatorEntity)
  private validatorRepository: Repository<RememberMfaValidatorEntity>) { }

  setNewRememberMfaCookie(res: Response, user: UserEntity): void {
    console.log('Setting new remember2fa cookie');
    const token = nanoid(32);
    this.createRememberMfaValidator(token, user);
    res.cookie('remember2fa', token, cookieConfig);
  }

  setClearRememberMfaCookie(res: Response) {
    console.log('Set clear remember2fa cookie');
    res.clearCookie('remember2fa', cookieConfig);
  }

  async createRememberMfaValidator(token: string, user: UserEntity): Promise<void> {
    const validator = new RememberMfaValidatorEntity();
    validator.token = token;
    validator.user = user;
    validator.expires = new Date(Date.now() + cookieConfig.maxAge);
    this.validatorRepository.save(validator);
  }

  async removeRememberMfaValidator(token: string): Promise<void> {
    this.validatorRepository.delete({token: token});
  }

  async removeAllRememberMfaValidatorsForUser(user: UserEntity): Promise<void> {
    this.validatorRepository.delete({user: user});
  }

  async isRememberMfaTokenValid(rememberMfaToken: string, user: UserEntity): Promise<boolean> {
    console.log('Remember2fa token value is', rememberMfaToken);
    const validator = await this.validatorRepository.findOne({
      where: {
        token: rememberMfaToken,
        user: user,
      },
    });
    console.log('Validator for cookie value is', validator);
    if (validator && validator.expires >= new Date()) {
      console.log('Remember2fa cookie valid.');
      return true;
    } else {
      console.log('Remember2fa cookie invalid or expired.');
      return false;
    }
  }
}
