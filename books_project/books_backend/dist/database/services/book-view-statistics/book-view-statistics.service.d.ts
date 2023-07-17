import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { BookViewStatistic } from '../../entities/BookViewStatistic';
import { BookViewStatisticFilterDto } from '../../../dto/filters/book-view-statistic-filter.dto';
export declare class BookViewStatisticsService {
    private bookViewStatisticRepository;
    private bookRepository;
    constructor(bookViewStatisticRepository: Repository<BookViewStatistic>, bookRepository: Repository<Book>);
    findAll(filter?: BookViewStatisticFilterDto): Promise<BookViewStatistic[]>;
    findOne(filter?: BookViewStatisticFilterDto): Promise<BookViewStatistic>;
    private getFilter;
    save(item: BookViewStatistic): Promise<BookViewStatistic>;
}
