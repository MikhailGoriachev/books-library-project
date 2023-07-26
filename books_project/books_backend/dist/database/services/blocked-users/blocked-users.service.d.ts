import { BlockedUser } from '../../entities/BlockedUser';
import { Repository } from 'typeorm';
import { BlockedUserFilterDto } from '../../../dto/filters/blocked-user-filter.dto';
import { User } from '../../entities/User';
export declare class BlockedUsersService {
    private blockedUserRepository;
    private userRepository;
    constructor(blockedUserRepository: Repository<BlockedUser>, userRepository: Repository<User>);
    findAll(filter?: BlockedUserFilterDto): Promise<BlockedUser[]>;
    findOne(filter?: BlockedUserFilterDto): Promise<BlockedUser>;
    private getFilter;
    save(item: BlockedUser): Promise<BlockedUser>;
}
