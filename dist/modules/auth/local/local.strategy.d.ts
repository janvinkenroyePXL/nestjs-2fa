import { Strategy } from 'passport-local';
import { UsersService } from 'src/modules/users/users.service';
import { UserEntity } from 'src/modules/users/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(username: string, password: string): Promise<UserEntity>;
}
export {};
