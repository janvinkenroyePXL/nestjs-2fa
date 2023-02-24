import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user-dto';
import { UserWithoutSecretsDto } from './dto/user-without-secrets-dto';
import { UserEntity } from './user.entity';
import { UsernameAlreadyExistsException } from 'src/exceptions/username-already-exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find()
  }

  findAllWithRoles(): Promise<UserEntity[]> {
    return this.usersRepository.find({
      relations: ['roles'],
    })
  }

  findById(userId: number): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['roles'],
    });
  }

  findByUsername(username: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        username: username,
      },
      relations: ['roles'],
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: CreateUserDto): Promise<UserWithoutSecretsDto> {
    if (await this.findByUsername(user.username)) {
      throw new UsernameAlreadyExistsException();
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(user.password, salt);
    let newUser = this.usersRepository.create({ username: user.username, password, has2faEnabled: false }); 
    return this.save(newUser);
  }

  async save(user: UserEntity): Promise<UserWithoutSecretsDto> {
    const savedUser = await this.usersRepository.save(user);
    const { password, mfaSecret, ...userWithoutSecrets } = savedUser;
    return userWithoutSecrets;
    }
  }