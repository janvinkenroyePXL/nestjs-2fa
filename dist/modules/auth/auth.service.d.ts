import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MfaService } from '../mfa/mfa.service';
import { UserEntity } from '../users/user.entity';
export declare class AuthService {
    private jwtService;
    private mfaService;
    constructor(jwtService: JwtService, mfaService: MfaService);
    login(user: UserEntity, remember2faToken: string, otp: string, remember2fa: string, res: Response): Promise<any>;
}
