import { BooksService } from '../../../database/services/books/books.service';
import { Book } from '../../../database/entities/Book';
import { BookDto } from '../../../dto/crud/book.dto';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';
export declare class BooksController {
    private _booksService;
    constructor(_booksService: BooksService);
    findAll(filter: BookFilterDto): Promise<Book[]>;
    findAllPagination(pageOptionsDto: BookPaginationFilterDto): Promise<PageDto<Book>>;
    findOne(filter: BookFilterDto): Promise<Book>;
    priceRange(): Promise<any>;
    publicationYearRange(): Promise<any>;
    publicationYearRangeWithDeleted(): Promise<any>;
    topBooksByRating(): Promise<Book[]>;
    topBooksByViewed(): Promise<Book[]>;
    topBooksByAddition(): Promise<Book[]>;
    findAllWithDeleted(filter: BookFilterDto): Promise<Book[]>;
    findAllPaginationWithDeleted(pageOptionsDto: BookPaginationFilterDto): Promise<PageDto<Book>>;
    findOneByIdWithDeleted(id: number): Promise<Book>;
    findOneWithDeleted(filter: BookFilterDto): Promise<Book>;
    create(item: BookDto): Promise<Book>;
    update(item: BookDto): Promise<Book>;
    findOneById(id: number): Promise<Book>;
}
