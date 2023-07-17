import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { Category } from '../../entities/Category';
import { Author } from '../../entities/Author';
export declare class BooksService {
    private bookRepository;
    private categoryRepository;
    private authorRepository;
    constructor(bookRepository: Repository<Book>, categoryRepository: Repository<Category>, authorRepository: Repository<Author>);
    findAll(filter?: BookFilterDto): Promise<Book[]>;
    findOne(filter?: BookFilterDto): Promise<Book>;
    private getFilter;
    save(item: Book): Promise<Book>;
}
