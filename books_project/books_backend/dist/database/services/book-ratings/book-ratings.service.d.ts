import { BookRating } from '../../entities/BookRating';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';
import { BookRatingFilterDto } from '../../../dto/filters/book-rating-filter.dto';
export declare class BookRatingsService {
    private bookRatingRepository;
    private bookRepository;
    private userRepository;
    constructor(bookRatingRepository: Repository<BookRating>, bookRepository: Repository<Book>, userRepository: Repository<User>);
    findAll(filter?: BookRatingFilterDto): Promise<BookRating[]>;
    findOne(filter?: BookRatingFilterDto): Promise<BookRating>;
    private getFilter;
    save(item: BookRating): Promise<BookRating>;
    delete(item: BookRating): Promise<BookRating>;
    deleteById(id: number): Promise<BookRating>;
}
