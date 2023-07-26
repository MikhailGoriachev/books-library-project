import { CategoryViewStatisticFilterDto } from '../../../dto/filters/category-view-statistic-filter.dto';
import { CategoryViewStatisticsService } from '../../../database/services/category-view-statistics/category-view-statistics.service';
import { CategoryViewStatisticDto } from '../../../dto/crud/category-view-statistic.dto';
import { CategoryViewStatistic } from '../../../database/entities/CategoryViewStatistic';
export declare class CategoryViewStatisticsController {
    private _categoryViewStatisticsService;
    constructor(_categoryViewStatisticsService: CategoryViewStatisticsService);
    findAll(filter: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic[]>;
    findOne(filter: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic>;
    findOneById(id: number): Promise<CategoryViewStatistic>;
    create(item: CategoryViewStatisticDto): Promise<CategoryViewStatistic>;
    update(item: CategoryViewStatisticDto): Promise<CategoryViewStatistic>;
}
