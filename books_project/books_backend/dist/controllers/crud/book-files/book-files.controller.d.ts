import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import { BookFileFilterDto } from '../../../dto/filters/book-file-filter.dto';
import { BookFileDto } from '../../../dto/crud/book-file.dto';
import { BookFile } from '../../../database/entities/BookFile';
export declare class BookFilesController {
    private _bookFilesService;
    constructor(_bookFilesService: BookFilesService);
    findAll(filter: BookFileFilterDto): Promise<BookFile[]>;
    findOne(filter: BookFileFilterDto): Promise<BookFile>;
    findOneById(id: number): Promise<BookFile>;
    create(item: BookFileDto): Promise<BookFile>;
    update(item: BookFileDto): Promise<BookFile>;
}
