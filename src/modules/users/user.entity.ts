import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';

import { RememberMfaValidatorEntity } from '../remember-mfa/remember-mfa-validator.entity';
import { RoleEntity } from './role.entity';

@Entity({name: 'user'})
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column({ nullable: true })
  mfaSecret?: string;

  @Column({ default: true })
  has2faEnabled: boolean;

  @OneToMany(type => RememberMfaValidatorEntity, rememberMfaValidator => rememberMfaValidator.user)
  rememberMfaValidators: RememberMfaValidatorEntity[]

  @ManyToMany(type => RoleEntity)
  @JoinTable({name: 'user_role'})
  roles: RoleEntity[];
}