import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCartItem } from '../../entities/UserCartItem';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Book } from '../../entities/Book';
import { UserCartItemFilterDto } from '../../../dto/filters/user-cart-item-filter.dto';

@Injectable()
export class UserCartItemsService {
    constructor(
        @InjectRepository(UserCartItem)
        private cartItemRepository: Repository<UserCartItem>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(filter?: UserCartItemFilterDto): Promise<UserCartItem[]> {
        return this.cartItemRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: UserCartItemFilterDto): Promise<UserCartItem> {
        return this.cartItemRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: UserCartItemFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['book'] = this.bookRepository.findOneBy({ id: filter.bookId });

        return fields;
    }

    async save(item: UserCartItem): Promise<UserCartItem> {
        return this.cartItemRepository.save(item);
    }
}
