import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
import { UserIdentifierDto } from '../users/dto/user-identifier-dto';
import { RememberMfaValidatorEntity } from './remember-mfa-validator.entity';
import { UserWithoutSecretsDto } from '../users/dto/user-without-secrets-dto';
export declare class MfaService {
    private usersService;
    private configService;
    private validatorRepository;
    constructor(usersService: UsersService, configService: ConfigService, validatorRepository: Repository<RememberMfaValidatorEntity>);
    validateMfa(req: any, otp: string, remember: string, res: Response, user: UserEntity): Promise<boolean>;
    validateOtp(otp: string, authenticatedUser: UserEntity): Promise<boolean>;
    setNewRememberMfaCookie(res: Response, user: UserEntity): void;
    validateRememberMfaCookie(req: any): Promise<boolean>;
    enableMfa(username: string, otp: string): Promise<UserWithoutSecretsDto>;
    disableMfa(username: string, otp: string): Promise<UserWithoutSecretsDto>;
    setMfaSecret(secret: string, userId: number): Promise<UserWithoutSecretsDto>;
    generateMfaSecret(userIdentifier: UserIdentifierDto): Promise<{
        otpauthUrl: string;
    }>;
    pipeQrCodeStream(stream: Response, otpauthUrl: string): Promise<any>;
}
