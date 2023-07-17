import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(filter?: UserFilterDto): Promise<User[]>;
    findOne(filter?: UserFilterDto): Promise<User>;
    private getFilter;
    save(item: User): Promise<User>;
    getUserWithPassword(filter?: UserFilterDto): Promise<User>;
}
