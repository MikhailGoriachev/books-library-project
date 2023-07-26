import { Repository } from 'typeorm';
import { Author } from '../../entities/Author';
import { AuthorViewStatistic } from '../../entities/AuthorViewStatistic';
import { AuthorViewStatisticFilterDto } from '../../../dto/filters/author-view-statistic-filter.dto';
export declare class AuthorViewStatisticsService {
    private authorViewStatisticRepository;
    private authorRepository;
    constructor(authorViewStatisticRepository: Repository<AuthorViewStatistic>, authorRepository: Repository<Author>);
    findAll(filter?: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic[]>;
    findOne(filter?: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic>;
    private getFilter;
    save(item: AuthorViewStatistic): Promise<AuthorViewStatistic>;
}
