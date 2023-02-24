import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<import("../users/dto/user-without-secrets-dto").UserWithoutSecretsDto>;
    login(res: Response, otp: string, remember2fa: string, remember2faToken: string, user: UserEntity): Promise<any>;
    logout(): Promise<{
        success: boolean;
    }>;
}
