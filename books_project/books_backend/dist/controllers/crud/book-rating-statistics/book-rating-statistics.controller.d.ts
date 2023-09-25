import { BookRatingStatisticFilterDto } from '../../../dto/filters/book-rating-statistic-filter.dto';
import { BookRatingStatisticsService } from '../../../database/services/book-rating-statistics/book-rating-statistics.service';
import { BookRatingStatisticDto } from '../../../dto/crud/book-rating-statistic.dto';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';
export declare class BookRatingStatisticsController {
    private _bookRatingStatisticsService;
    constructor(_bookRatingStatisticsService: BookRatingStatisticsService);
    findAll(filter: BookRatingStatisticFilterDto): Promise<BookRatingStatistic[]>;
    findOne(filter: BookRatingStatisticFilterDto): Promise<BookRatingStatistic>;
    findOneById(id: number): Promise<BookRatingStatistic>;
    create(item: BookRatingStatisticDto): Promise<BookRatingStatistic>;
    update(item: BookRatingStatisticDto): Promise<BookRatingStatistic>;
}
