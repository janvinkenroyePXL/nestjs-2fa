import { BaseEntity } from 'typeorm';
import { UserEntity } from '../users/user.entity';
export declare class RememberMfaValidatorEntity extends BaseEntity {
    id: number;
    user: UserEntity;
    token: string;
    expires: Date;
}
