import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { UserPaginationFilterDto } from '../../../dto/filters/user-pagination-filter.dto';
export declare class UsersService {
    private readonly _usersRepository;
    constructor(_usersRepository: Repository<User>);
    findAll(filter?: UserFilterDto, withDeleted?: boolean): Promise<User[]>;
    findAllByPagination(filter: UserPaginationFilterDto, withDeleted?: boolean): Promise<PageDto<User>>;
    findOne(filter?: UserFilterDto, withDeleted?: boolean): Promise<User>;
    private getFilter;
    save(item: User): Promise<User>;
    getUserWithPassword(filter?: UserFilterDto): Promise<User>;
}
