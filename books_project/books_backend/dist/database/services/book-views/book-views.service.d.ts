import { BookView } from '../../entities/BookView';
import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { User } from '../../entities/User';
import { BookViewFilterDto } from '../../../dto/filters/book-view-filter.dto';
export declare class BookViewsService {
    private bookViewRepository;
    private bookRepository;
    private userRepository;
    constructor(bookViewRepository: Repository<BookView>, bookRepository: Repository<Book>, userRepository: Repository<User>);
    findAll(filter?: BookViewFilterDto): Promise<BookView[]>;
    findOne(filter?: BookViewFilterDto): Promise<BookView>;
    private getFilter;
    save(item: BookView): Promise<BookView>;
}
