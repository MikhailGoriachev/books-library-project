import { Repository } from 'typeorm';
import { Category } from '../../entities/Category';
import { CategoryViewStatistic } from '../../entities/CategoryViewStatistic';
import { CategoryViewStatisticFilterDto } from '../../../dto/filters/category-view-statistic-filter.dto';
export declare class CategoryViewStatisticsService {
    private categoryViewStatisticRepository;
    private categoryRepository;
    constructor(categoryViewStatisticRepository: Repository<CategoryViewStatistic>, categoryRepository: Repository<Category>);
    findAll(filter?: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic[]>;
    findOne(filter?: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic>;
    private getFilter;
    save(item: CategoryViewStatistic): Promise<CategoryViewStatistic>;
}
