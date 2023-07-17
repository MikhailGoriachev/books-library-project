import { BookRatingStatistic } from '../../entities/BookRatingStatistic';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';
import { BookRatingStatisticFilterDto } from '../../../dto/filters/book-rating-statistic-filter.dto';
export declare class BookRatingStatisticsService {
    private bookRatingStatisticRepository;
    private bookRepository;
    private userRepository;
    constructor(bookRatingStatisticRepository: Repository<BookRatingStatistic>, bookRepository: Repository<Book>, userRepository: Repository<User>);
    findAll(filter?: BookRatingStatisticFilterDto): Promise<BookRatingStatistic[]>;
    findOne(filter?: BookRatingStatisticFilterDto): Promise<BookRatingStatistic>;
    private getFilter;
    save(item: BookRatingStatistic): Promise<BookRatingStatistic>;
}
