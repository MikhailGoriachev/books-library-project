import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookView } from '../../entities/BookView';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';
import { getDateBetween } from '../../../infrastructure/utils';
import { BookViewFilterDto } from '../../../dto/filters/book-view-filter.dto';

@Injectable()
export class BookViewsService {
    constructor(
        @InjectRepository(BookView)
        private bookViewRepository: Repository<BookView>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: BookViewFilterDto): Promise<BookView[]> {
        return this.bookViewRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }

    async findOne(filter?: BookViewFilterDto): Promise<BookView> {
        return this.bookViewRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'book'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: BookViewFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['book'] = this.bookRepository.findOneBy({ id: filter.bookId });
        fields['viewedAt'] = filter.viewedAt ?? getDateBetween(filter.minViewedAt, filter.maxViewedAt);

        return fields;
    }

    async save(item: BookView): Promise<BookView> {
        return this.bookViewRepository.save(item);
    }
}
