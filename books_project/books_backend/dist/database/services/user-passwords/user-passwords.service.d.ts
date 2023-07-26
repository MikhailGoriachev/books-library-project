import { UserPassword } from '../../entities/UserPassword';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { UserPasswordFilterDto } from '../../../dto/filters/user-password-filter.dto';
export declare class UserPasswordsService {
    private userPasswordRepository;
    private userRepository;
    constructor(userPasswordRepository: Repository<UserPassword>, userRepository: Repository<User>);
    findAll(filter?: UserPasswordFilterDto): Promise<UserPassword[]>;
    findOne(filter?: UserPasswordFilterDto): Promise<UserPassword>;
    private getFilter;
    save(item: UserPassword): Promise<UserPassword>;
}
