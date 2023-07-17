import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBetween, getById } from '../../../infrastructure/utils';
import { BookView } from '../../entities/BookView';
import { Book } from '../../entities/Book';
import { BookViewStatistic } from '../../entities/BookViewStatistic';
import { BookViewStatisticFilterDto } from '../../../dto/filters/book-view-statistic-filter.dto';

@Injectable()
export class BookViewStatisticsService {
    constructor(
        @InjectRepository(BookViewStatistic)
        private bookViewStatisticRepository: Repository<BookViewStatistic>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(filter?: BookViewStatisticFilterDto): Promise<BookViewStatistic[]> {
        return this.bookViewStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }

    async findOne(filter?: BookViewStatisticFilterDto): Promise<BookViewStatistic> {
        return this.bookViewStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['book'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: BookViewStatisticFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['book'] = getById(filter.bookId);
        fields['amount'] = filter.amount ?? getBetween(filter.minAmount, filter.maxAmount);

        return fields;
    }

    async save(item: BookViewStatistic): Promise<BookViewStatistic> {
        return this.bookViewStatisticRepository.save(item);
    }
}
