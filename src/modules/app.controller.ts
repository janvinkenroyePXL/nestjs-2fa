import { Controller, UseGuards, Get, Req, UseFilters } from '@nestjs/common';

import * as MOCKED_SYSTEMS from 'src/data/systems-mock.json';
import * as MOCKED_USER_2FA_ENABLED from 'src/data/user-mock-2fa-enabled.json';
import * as MOCKED_USER_2FA_DISABLED from 'src/data/user-mock-2fa-disabled.json';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { UserEntity } from './users/user.entity';

@Controller()
export class AppController {
  constructor() { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('systems')
  getSystems() {
    return MOCKED_SYSTEMS;
  }

  @UseGuards(JwtAuthGuard)
  @Get('organisations/:organisationId/users/:userId')
  getUserInfo(@User() user: UserEntity) {
    if(user.has2faEnabled) {
      console.log("User has 2fa enabled. Mocking response");
      return MOCKED_USER_2FA_ENABLED;
    } else {
      console.log("User has 2fa disabled. Mocking response");
      return MOCKED_USER_2FA_DISABLED;
    }
  }
}
