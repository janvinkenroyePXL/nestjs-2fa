import { BaseEntity } from 'typeorm';
import { RememberMfaValidatorEntity } from '../remember-mfa/remember-mfa-validator.entity';
import { RoleEntity } from './role.entity';
export declare class UserEntity extends BaseEntity {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    mfaSecret?: string;
    has2faEnabled: boolean;
    rememberMfaValidators: RememberMfaValidatorEntity[];
    roles: RoleEntity[];
}
