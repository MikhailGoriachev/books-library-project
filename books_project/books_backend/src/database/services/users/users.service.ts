import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { Book } from '../../entities/Book';
import { PageMetaDto } from '../../../dto/pagination/page-meta.dto';
import { UserPaginationFilterDto } from '../../../dto/filters/user-pagination-filter.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly _usersRepository: Repository<User>,
    ) {}


    async findAll(filter?: UserFilterDto, withDeleted: boolean = false): Promise<User[]> {
        return this._usersRepository.find({
            where: this.getFilter(filter),
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles'],
            withDeleted,
        });
    }

    public async findAllByPagination(filter: UserPaginationFilterDto,
                                     withDeleted: boolean = false): Promise<PageDto<User>> {

        const count = await this._usersRepository.count({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles'],
            withDeleted,
        });

        const items = await this._usersRepository.find({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles'],
            relationLoadStrategy: 'join',
            withDeleted,
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });

        return new PageDto(items, pageMetaDto);
    }

    async findOne(filter?: UserFilterDto, withDeleted: boolean = false): Promise<User> {
        return this._usersRepository.findOne({
            where: this.getFilter(filter),
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles'],
            withDeleted,
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: UserFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['name'] = getLike(filter.name);
        fields['email'] = getLike(filter.email);

        return fields;
    }

    async save(item: User): Promise<User> {
        return this._usersRepository.save(item);
    }

    async getUserWithPassword(filter?: UserFilterDto) {
        return await this._usersRepository.findOne({
            where: this.getFilter(filter),
            relations: ['sales', 'userCartItems', 'blockedUsers', 'roles', 'userPassword'],
        });
    }
}
