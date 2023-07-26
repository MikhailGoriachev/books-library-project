import { AuthorViewStatisticFilterDto } from '../../../dto/filters/author-view-statistic-filter.dto';
import { AuthorViewStatisticsService } from '../../../database/services/author-view-statistics/author-view-statistics.service';
import { AuthorViewStatisticDto } from '../../../dto/crud/author-view-statistic.dto';
import { AuthorViewStatistic } from '../../../database/entities/AuthorViewStatistic';
export declare class AuthorViewStatisticsController {
    private _authorViewStatisticsService;
    constructor(_authorViewStatisticsService: AuthorViewStatisticsService);
    findAll(filter: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic[]>;
    findOne(filter: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic>;
    findOneById(id: number): Promise<AuthorViewStatistic>;
    create(item: AuthorViewStatisticDto): Promise<AuthorViewStatistic>;
    update(item: AuthorViewStatisticDto): Promise<AuthorViewStatistic>;
}
