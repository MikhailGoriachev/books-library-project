import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRatingStatistic } from '../../entities/BookRatingStatistic';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { getBetween, getById } from '../../../infrastructure/utils';
import { User } from '../../entities/User';
import { BookRatingStatisticFilterDto } from '../../../dto/filters/book-rating-statistic-filter.dto';

@Injectable()
export class BookRatingStatisticsService {
    constructor(
        @InjectRepository(BookRatingStatistic)
        private bookRatingStatisticRepository: Repository<BookRatingStatistic>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: BookRatingStatisticFilterDto): Promise<BookRatingStatistic[]> {
        return this.bookRatingStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }

    async findOne(filter?: BookRatingStatisticFilterDto): Promise<BookRatingStatistic> {
        return this.bookRatingStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: BookRatingStatisticFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['book'] = getById(filter.bookId);
        fields['value'] = filter.value ?? getBetween(filter.minValue, filter.maxValue);

        return fields;
    }

    async save(item: BookRatingStatistic): Promise<BookRatingStatistic> {
        return this.bookRatingStatisticRepository.save(item);
    }
}
