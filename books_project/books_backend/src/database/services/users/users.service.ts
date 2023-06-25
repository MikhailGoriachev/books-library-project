import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/User';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(filter?: UserFilterDto): Promise<User[]> {
        return this.usersRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: UserFilterDto): Promise<User> {
        return this.usersRepository.findOne({ where: this.getFilter(filter) });
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
        return this.usersRepository.save(item);
    }
}
