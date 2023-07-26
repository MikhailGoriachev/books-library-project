import { BlockedUsersService } from '../../../database/services/blocked-users/blocked-users.service';
import { BlockedUserFilterDto } from '../../../dto/filters/blocked-user-filter.dto';
import { BlockedUserDto } from '../../../dto/crud/blocked-user.dto';
import { BlockedUser } from '../../../database/entities/BlockedUser';
export declare class BlockedUsersController {
    private _blockedUsersService;
    constructor(_blockedUsersService: BlockedUsersService);
    findAll(filter: BlockedUserFilterDto): Promise<BlockedUser[]>;
    findOne(filter: BlockedUserFilterDto): Promise<BlockedUser>;
    findOneById(id: number): Promise<BlockedUser>;
    create(item: BlockedUserDto): Promise<BlockedUser>;
    update(item: BlockedUserDto): Promise<BlockedUser>;
}
