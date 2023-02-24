import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/user.entity';
export declare class OtpService {
    private usersService;
    constructor(usersService: UsersService);
    isOtpValid(otp: string, user: UserEntity): Promise<boolean>;
}
