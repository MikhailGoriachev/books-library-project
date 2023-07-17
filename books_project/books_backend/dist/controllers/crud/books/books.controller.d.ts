import { BooksService } from '../../../database/services/books/books.service';
import { Book } from '../../../database/entities/Book';
import { BookDto } from '../../../dto/crud/book.dto';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
export declare class BooksController {
    private _booksService;
    constructor(_booksService: BooksService);
    findAll(filter: BookFilterDto): Promise<Book[]>;
    findOne(filter: BookFilterDto): Promise<Book>;
    findOneById(id: number): Promise<Book>;
    create(item: BookDto): Promise<Book>;
    update(item: BookDto): Promise<Book>;
}
