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
        return this.cartItemRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book', 'book.authors'],
        });
    }

    async findOne(filter?: UserCartItemFilterDto): Promise<UserCartItem> {
        return this.cartItemRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book', 'book.authors'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: UserCartItemFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = filter.userId !== undefined 
            ? { id: filter.userId } : undefined;
        
        fields['book'] = filter.bookId !== undefined 
            ? { id: filter.bookId } : undefined;

        return fields;
    }

    async save(item: UserCartItem): Promise<UserCartItem> {
        return this.cartItemRepository.save(item);
    }

    async delete(id: number): Promise<any> {
        await this.cartItemRepository.remove(await this.cartItemRepository.findOneBy({ id }));
    }
    
    async deleteAll(cartItems: UserCartItem[]): Promise<any> {
        await this.cartItemRepository.remove(cartItems);
    }
}
