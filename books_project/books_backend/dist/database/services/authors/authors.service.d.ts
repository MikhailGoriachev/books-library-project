import { Author } from '../../entities/Author';
import { Repository } from 'typeorm';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { Book } from '../../entities/Book';
export declare class AuthorsService {
    private authorRepository;
    private bookRepository;
    constructor(authorRepository: Repository<Author>, bookRepository: Repository<Book>);
    findAll(filter?: AuthorFilterDto): Promise<Author[]>;
    findOne(filter?: AuthorFilterDto): Promise<Author>;
    private getFilter;
    save(item: Author): Promise<Author>;
}
