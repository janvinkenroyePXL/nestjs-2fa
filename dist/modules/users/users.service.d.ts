import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UserWithoutSecretsDto } from './dto/user-without-secrets-dto';
import { UserEntity } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findAllWithRoles(): Promise<UserEntity[]>;
    findById(userId: number): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity>;
    remove(id: string): Promise<void>;
    create(user: CreateUserDto): Promise<UserWithoutSecretsDto>;
    save(user: UserEntity): Promise<UserWithoutSecretsDto>;
}
