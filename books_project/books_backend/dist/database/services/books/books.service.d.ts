import { Repository } from 'typeorm';
import { Book } from '../../entities/Book';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { Category } from '../../entities/Category';
import { Author } from '../../entities/Author';
import { PageDto } from '../../../dto/pagination/page.dto';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';
export declare class BooksService {
    private bookRepository;
    private categoryRepository;
    private authorRepository;
    constructor(bookRepository: Repository<Book>, categoryRepository: Repository<Category>, authorRepository: Repository<Author>);
    findAll(filter?: BookFilterDto, withDeleted?: boolean): Promise<Book[]>;
    findAllByPagination(filter: BookPaginationFilterDto, withDeleted?: boolean): Promise<PageDto<Book>>;
    findOne(filter?: BookFilterDto, withDeleted?: boolean): Promise<Book>;
    findOneWithCartItems(filter?: BookFilterDto, withDeleted?: boolean): Promise<Book>;
    private getFilter;
    save(item: Book): Promise<Book>;
    delete(item: Book): Promise<Book>;
    getPriceRange(): Promise<any>;
    getPublicationYearRange(): Promise<any>;
    topBooksByRating(): Promise<Book[]>;
    topBooksByViewed(): Promise<Book[]>;
    topBooksByAddition(): Promise<Book[]>;
}
