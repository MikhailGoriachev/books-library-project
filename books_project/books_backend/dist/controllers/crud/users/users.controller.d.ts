import { UsersService } from '../../../database/services/users/users.service';
import { User } from '../../../database/entities/User';
import { UserDto } from '../../../dto/crud/user.dto';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';
import { UserPaginationFilterDto } from '../../../dto/filters/user-pagination-filter.dto';
export declare class UsersController {
    private _usersService;
    constructor(_usersService: UsersService);
    findAll(filter: UserFilterDto): Promise<User[]>;
    findAllPagination(pageOptionsDto: UserPaginationFilterDto): Promise<import("../../../dto/pagination/page.dto").PageDto<User>>;
    findOne(filter: UserFilterDto): Promise<User>;
    findOneById(id: number): Promise<User>;
    create(item: UserDto): Promise<User>;
    update(item: UserDto): Promise<User>;
}
