import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from '../../entities/UserPassword';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Book } from '../../entities/Book';
import { UserPasswordFilterDto } from '../../../dto/filters/user-password-filter.dto';

@Injectable()
export class UserPasswordsService {
    constructor(
        @InjectRepository(UserPassword)
        private userPasswordRepository: Repository<UserPassword>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: UserPasswordFilterDto): Promise<UserPassword[]> {
        return this.userPasswordRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: UserPasswordFilterDto): Promise<UserPassword> {
        return this.userPasswordRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: UserPasswordFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['password'] = filter.password;
        fields['isServiceAuth'] = filter.isServiceAuth;

        return fields;
    }

    async save(item: UserPassword): Promise<UserPassword> {
        return this.userPasswordRepository.save(item);
    }
}
