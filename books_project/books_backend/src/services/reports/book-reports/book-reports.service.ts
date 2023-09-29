import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../../../database/entities/Book';
import { In, Repository } from 'typeorm';
import { Sale } from '../../../database/entities/Sale';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookReportsService {
    constructor(
        @InjectRepository(Book)
        private readonly _booksRepository: Repository<Book>,
        @InjectRepository(Sale)
        private readonly _salesRepository: Repository<Sale>,
        @InjectRepository(BookViewStatistic)
        private readonly _bookViewStatisticsRepository: Repository<BookViewStatistic>,
        @InjectRepository(BookRatingStatistic)
        private readonly _bookRatingStatisticsRepository: Repository<BookRatingStatistic>,
    ) {}

    // самая рейтинговая книга
    async getBooksByMaxRating() {
        const maxRating = await this._bookRatingStatisticsRepository
            .maximum('value');

        let statistics = await this._bookRatingStatisticsRepository
            .find({
                where: { amount: maxRating },
                loadRelationIds: true,
            });

        const ids = statistics.map(s => s.id);

        return this._booksRepository
            .find({
                where: {
                    id: In(ids),
                },
                relations: [
                    'categories',
                    'authors',
                    'bookFiles',
                    'bookFiles.fileExtension',
                    'bookRatingStatistic',
                    'bookViewStatistic',
                ],
                relationLoadStrategy: 'join',
            });
    }

    // самая просматриваемая книга
    async getBookByMaxViewed() {
        const maxViewed = await this._bookViewStatisticsRepository
            .maximum('amount');

        let statistics = await this._bookViewStatisticsRepository
            .find({
                where: { amount: maxViewed },
                loadRelationIds: true,
            });

        const ids = statistics.map(s => s.id);

        return this._booksRepository
            .find({
                where: {
                    id: In(ids),
                },
                relations: [
                    'categories',
                    'authors',
                    'bookFiles',
                    'bookFiles.fileExtension',
                    'bookRatingStatistic',
                    'bookViewStatistic',
                ],
                relationLoadStrategy: 'join',
            });
    }

    // самая продаваемая книга
    async getBookByMaxSales() {
        const sales = await this._salesRepository.find({
            loadRelationIds: true,
        });

        const booksFrequency = new Map<number, number>;

        for (const sale of sales) {
            const bookId = (sale.book as any) as number;
            const value = booksFrequency.get(bookId);

            booksFrequency.set(bookId, value ? value + 1 : 1);
        }

        const values = [...booksFrequency.values()];
        const maxAmount = Math.max(...values);
        const ids = [...booksFrequency]
            .filter(v => v[1] === maxAmount)
            .map(v => v[0]);

        return this._booksRepository.find({
            where: {
                id: In(ids),
            },
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            relationLoadStrategy: 'join',
        });
    }
}
