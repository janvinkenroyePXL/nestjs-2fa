import { Response } from 'express';
import { UserEntity } from '../users/user.entity';
import { MfaService } from './mfa.service';
export declare class MfaController {
    private mfaService;
    constructor(mfaService: MfaService);
    generateQrDev(res: any, user: UserEntity): Promise<any>;
    generateDev(user: UserEntity): Promise<{
        otpauthUrl: string;
    }>;
    enableMfaDev(user: UserEntity, otp: string): Promise<import("../users/dto/user-without-secrets-dto").UserWithoutSecretsDto>;
    disableMfaDev(res: Response, user: UserEntity, otp: string): Promise<import("../users/dto/user-without-secrets-dto").UserWithoutSecretsDto>;
    generate(user: UserEntity): Promise<{
        otpauthUrl: string;
    }>;
    enableMfa(user: UserEntity, otp: string): Promise<import("../users/dto/user-without-secrets-dto").UserWithoutSecretsDto>;
    disableMfa(res: Response, user: UserEntity, otp: string): Promise<import("../users/dto/user-without-secrets-dto").UserWithoutSecretsDto>;
}
