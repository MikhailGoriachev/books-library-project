import { BookFile } from '../../entities/BookFile';
import { Repository } from 'typeorm';
import { BookFileFilterDto } from '../../../dto/filters/book-file-filter.dto';
import { Book } from '../../entities/Book';
import { FileExtension } from '../../entities/FileExtension';
export declare class BookFilesService {
    private bookFileRepository;
    private bookRepository;
    private fileExtensionRepository;
    constructor(bookFileRepository: Repository<BookFile>, bookRepository: Repository<Book>, fileExtensionRepository: Repository<FileExtension>);
    findAll(filter?: BookFileFilterDto): Promise<BookFile[]>;
    findOne(filter?: BookFileFilterDto): Promise<BookFile>;
    private getFilter;
    save(item: BookFile): Promise<BookFile>;
}
