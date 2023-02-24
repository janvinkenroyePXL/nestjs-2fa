import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity(({name: 'role'}))
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}