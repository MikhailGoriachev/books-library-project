import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../../../database/entities/Book';
import { Between, In, Repository } from 'typeorm';
import { Sale } from '../../../database/entities/Sale';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksReportFilterDto } from '../../../dto/reports/books/books-report-filter.dto';
import { BooksService } from '../../../database/services/books/books.service';
import { SalesService } from '../../../database/services/sales/sales.service';
import { DateService } from '../../date/date.service';
import { BookView } from '../../../database/entities/BookView';
import { BookRating } from '../../../database/entities/BookRating';
import { BookReportsGroupDto } from '../../../dto/reports/books/book-reports-group.dto';
import { BookReportDto } from '../../../dto/reports/books/book-report.dto';

@Injectable()
export class BooksReportsService {
    constructor(
        @InjectRepository(Book)
        private readonly _bookRepository: Repository<Book>,
        private readonly _booksService: BooksService,
        @InjectRepository(Sale)
        private readonly _saleRepository: Repository<Sale>,
        private readonly _salesService: SalesService,
        @InjectRepository(BookViewStatistic)
        private readonly _bookViewStatisticRepository: Repository<BookViewStatistic>,
        @InjectRepository(BookView)
        private readonly _bookViewRepository: Repository<BookView>,
        @InjectRepository(BookRatingStatistic)
        private readonly _bookRatingStatisticRepository: Repository<BookRatingStatistic>,
        @InjectRepository(BookRating)
        private readonly _bookRatingRepository: Repository<BookRating>,
        private readonly _dateService: DateService,
    ) {}

    // самая рейтинговая книга
    async getBooksByMaxRating() {
        const maxRating = await this._bookRatingStatisticRepository
            .maximum('value');

        let statistics = await this._bookRatingStatisticRepository
            .find({
                where: { amount: maxRating },
                loadRelationIds: true,
            });

        const ids = statistics.map(s => s.id);

        return this._bookRepository
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
    async getBooksByMaxViewed() {
        const maxViewed = await this._bookViewStatisticRepository
            .maximum('amount');

        let statistics = await this._bookViewStatisticRepository
            .find({
                where: { amount: maxViewed },
                loadRelationIds: true,
            });

        const ids = statistics.map(s => s.id);

        return this._bookRepository
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
    async getBooksByMaxSales() {
        const sales = await this._saleRepository.find({
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

        return this._bookRepository.find({
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

    // получить отчёт о книгах за период
    async getBooksByPeriod(filter: BooksReportFilterDto): Promise<BookReportsGroupDto> {
        const books = await this._booksService.findAll(filter, true);

        filter.begin = this._dateService.getStartOfDay(filter.begin);
        filter.end = this._dateService.getEndOfDay(filter.end);

        const bookIds = In(books.map(b => b.id));

        const sales = await this._saleRepository.find({
            where: {
                saleAt: Between(filter.begin, filter.end),
                book: { id: bookIds },
            },
            loadRelationIds: true,
            withDeleted: true,
        });

        const views = await this._bookViewRepository.find({
            where: {
                viewedAt: Between(filter.begin, filter.end),
                book: { id: bookIds },
            },
            loadRelationIds: true,
            withDeleted: true,
        });

        const ratings = await this._bookRatingRepository.find({
            where: {
                createdAt: Between(filter.begin, filter.end),
                book: { id: bookIds },
            },
            loadRelationIds: true,
            withDeleted: true,
        });

        const reports = books.map((b): BookReportDto => {
            const s = sales.filter(s => s.book as any === b.id);
            const v = views.filter(s => s.book as any === b.id);
            const r = ratings.filter(s => s.book as any === b.id);

            return {
                book: b,
                sales: s,
                avgSalePrice: s.length > 0
                    ? s.reduce((prev, cur) => prev + cur.price, 0) / s.length
                    : 0,
                profit: s.length > 0
                    ? s.reduce((prev, cur) => prev + cur.price, 0)
                    : 0,
                views: v,
                ratings: r,
                avgRating: r.length > 0
                    ? r.reduce((prev, cur) => prev + cur.value, 0) / r.length
                    : 0,
            };
        });

        const isReportsNotEmpty = reports.length > 0;

        const resultSales = isReportsNotEmpty
            ? reports.flatMap(r => r.sales)
            : [];

        const resultProfit = resultSales.reduce((prev, cur) => prev + cur.price, 0);

        const resultViews = isReportsNotEmpty
            ? reports.flatMap(r => r.views)
            : [];

        const resultRatings = isReportsNotEmpty
            ? reports.flatMap(r => r.ratings)
            : [];

        return {
            begin: filter.begin,
            end: filter.end,
            reports,
            viewsAmount: resultViews.length,
            salesAmount: resultSales.length,
            avgSalePrice: resultProfit > 0 ? resultProfit / resultSales.length : 0,
            profit: resultProfit,
            ratingsAmount: resultRatings.length,
            avgRating: resultRatings.length > 0
                ? resultRatings.reduce((prev, cur) => prev + cur.value, 0) / resultRatings.length
                : 0,
        };

        // result.reports = result.reports.filter(r => {
        //     let res = true;
        //     if (filter.minAvgPriceSale && filter.maxAvgPriceSale)
        //         res = r.avgSalePrice >= filter.minAvgPriceSale 
        //             && r.avgSalePrice <= filter.maxAvgPriceSale;
        //
        //     return res;
        // });
    }
}