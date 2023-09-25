import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import { BookFileFilterDto } from '../../../dto/filters/book-file-filter.dto';
import { BookFileDto } from '../../../dto/crud/book-file.dto';
import { BookFile } from '../../../database/entities/BookFile';
import { FileExtensionsService } from '../../../database/services/file-extensions/file-extensions.service';
import { BooksService } from '../../../database/services/books/books.service';
export declare class BookFilesController {
    private _bookFilesService;
    private _booksService;
    private _fileExtensionsService;
    constructor(_bookFilesService: BookFilesService, _booksService: BooksService, _fileExtensionsService: FileExtensionsService);
    findAll(filter: BookFileFilterDto): Promise<BookFile[]>;
    findOne(filter: BookFileFilterDto): Promise<BookFile>;
    findOneById(id: number): Promise<BookFile>;
    create(item: BookFileDto): Promise<BookFile>;
    update(item: BookFileDto): Promise<BookFile>;
}
