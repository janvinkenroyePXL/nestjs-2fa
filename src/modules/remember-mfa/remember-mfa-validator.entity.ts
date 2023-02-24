import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';

import { UserEntity } from '../users/user.entity';

@Entity(({name: 'remember_mfa_validator'}))
export class RememberMfaValidatorEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => UserEntity, user => user.rememberMfaValidators)
  user: UserEntity;

  @Column()
  token: string;

  @Column({ type: 'timestamptz', nullable: true })
  expires: Date;
}
