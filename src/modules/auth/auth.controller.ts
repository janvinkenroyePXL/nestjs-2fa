import { Controller, Post, UseGuards, Get, Res, Body, Req } from '@nestjs/common';
import { Response } from 'express';
import { Cookie } from 'src/decorators/cookie.decorator';
import { User } from 'src/decorators/user.decorator';

import { CreateUserDto } from '../users/dto/create-user-dto';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller()
export class AuthController {
    constructor(private authService: AuthService,
        private usersService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        console.log('register attempt');
        return this.usersService.create(createUserDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Res({ passthrough: true }) res: Response,
        @Body('otp') otp: string,
        @Body('remember2fa') remember2fa: string,
        @Cookie('remember2fa') remember2faToken: string,
        @User() user: UserEntity) {
        console.log('We found the following remember2faToken: ', remember2faToken);
        return this.authService.login(user, remember2faToken, otp, remember2fa, res);
    }

    @Get('logout')
    async logout() {
        return { success: true };
    }
}
