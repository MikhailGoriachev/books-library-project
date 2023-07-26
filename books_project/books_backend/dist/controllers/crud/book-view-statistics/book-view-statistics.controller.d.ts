import { BookViewStatisticFilterDto } from '../../../dto/filters/book-view-statistic-filter.dto';
import { BookViewStatisticsService } from '../../../database/services/book-view-statistics/book-view-statistics.service';
import { BookViewStatisticDto } from '../../../dto/crud/book-view-statistic.dto';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
export declare class BookViewStatisticsController {
    private _bookViewStatisticsService;
    constructor(_bookViewStatisticsService: BookViewStatisticsService);
    findAll(filter: BookViewStatisticFilterDto): Promise<BookViewStatistic[]>;
    findOne(filter: BookViewStatisticFilterDto): Promise<BookViewStatistic>;
    findOneById(id: number): Promise<BookViewStatistic>;
    create(item: BookViewStatisticDto): Promise<BookViewStatistic>;
    update(item: BookViewStatisticDto): Promise<BookViewStatistic>;
}
