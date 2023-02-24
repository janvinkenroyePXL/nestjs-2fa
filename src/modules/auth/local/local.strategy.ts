import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/modules/users/users.service';
import { UserEntity } from 'src/modules/users/user.entity';
import { InvalidCredentialsException } from 'src/exceptions/invalid-credentials.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    console.log('Using passport.js LocalStrategy. Validating user', username, ' with the password', password, '...');
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      console.log('User', username, ' with password', password, ' was found in the database and is authenticated.');
      return user;
    } else {
      console.log('No user with username', username, ' and password', password, ' was found in the database.');
      throw new InvalidCredentialsException();
    }
  }
}