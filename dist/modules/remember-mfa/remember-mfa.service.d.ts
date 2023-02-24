import { Response } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { RememberMfaValidatorEntity } from '../remember-mfa/remember-mfa-validator.entity';
export declare class RememberMfaService {
    private validatorRepository;
    constructor(validatorRepository: Repository<RememberMfaValidatorEntity>);
    setNewRememberMfaCookie(res: Response, user: UserEntity): void;
    setClearRememberMfaCookie(res: Response): void;
    createRememberMfaValidator(token: string, user: UserEntity): Promise<void>;
    removeRememberMfaValidator(token: string): Promise<void>;
    removeAllRememberMfaValidatorsForUser(user: UserEntity): Promise<void>;
    isRememberMfaTokenValid(rememberMfaToken: string, user: UserEntity): Promise<boolean>;
}
