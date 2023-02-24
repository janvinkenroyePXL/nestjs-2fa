import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { UserIdentifierDto } from '../users/dto/user-identifier-dto';
import { UserWithoutSecretsDto } from '../users/dto/user-without-secrets-dto';
import { OtpService } from '../otp/otp.service';
import { RememberMfaService } from '../remember-mfa/remember-mfa.service';
export declare class MfaService {
    private usersService;
    private configService;
    private otpService;
    private rememberMfaService;
    constructor(usersService: UsersService, configService: ConfigService, otpService: OtpService, rememberMfaService: RememberMfaService);
    validateMfa(user: UserEntity, remember2faToken: string, otp: string, remember2fa: string, res: Response): Promise<void>;
    enableMfa(user: UserEntity, otp: string): Promise<UserWithoutSecretsDto>;
    disableMfa(user: UserEntity, otp: string, res: Response): Promise<UserWithoutSecretsDto>;
    setMfaSecret(secret: string, userId: number): Promise<UserWithoutSecretsDto>;
    generateMfaSecret(userIdentifier: UserIdentifierDto): Promise<{
        otpauthUrl: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
}
