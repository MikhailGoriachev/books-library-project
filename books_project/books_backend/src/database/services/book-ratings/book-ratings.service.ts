import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRating } from '../../entities/BookRating';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { getBetween } from '../../../infrastructure/utils';
import { User } from '../../entities/User';
import { BookRatingFilterDto } from '../../../dto/filters/book-rating-filter.dto';

@Injectable()
export class BookRatingsService {
    constructor(
        @InjectRepository(BookRating)
        private bookRatingRepository: Repository<BookRating>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: BookRatingFilterDto): Promise<BookRating[]> {
        return this.bookRatingRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }

    async findOne(filter?: BookRatingFilterDto): Promise<BookRating> {
        return this.bookRatingRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: BookRatingFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = filter.userId !== undefined ? { id: filter.userId } : undefined;
        fields['book'] = filter.bookId !== undefined ? { id: filter.bookId } : undefined;
        fields['value'] = filter.value ?? getBetween(filter.minValue, filter.maxValue);

        return fields;
    }

    async save(item: BookRating): Promise<BookRating> {
        return this.bookRatingRepository.save(item);
    }
    
    async delete(item: BookRating): Promise<BookRating> {
        return await this.bookRatingRepository.remove(item);
    }
    
    async deleteById(id: number): Promise<BookRating> {
        return await this.bookRatingRepository.remove(await this.bookRatingRepository.findOneBy({ id }));
    }
}
