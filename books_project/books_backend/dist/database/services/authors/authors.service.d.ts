import { Author } from '../../entities/Author';
import { Repository } from 'typeorm';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { Book } from '../../entities/Book';
import { PageDto } from '../../../dto/pagination/page.dto';
import { AuthorPaginationFilterDto } from '../../../dto/filters/author-pagination-filter.dto';
export declare class AuthorsService {
    private authorRepository;
    private bookRepository;
    constructor(authorRepository: Repository<Author>, bookRepository: Repository<Book>);
    findAll(filter?: AuthorFilterDto, withDeleted?: boolean): Promise<Author[]>;
    findOne(filter?: AuthorFilterDto, withDeleted?: boolean): Promise<Author>;
    findAllByPagination(filter: AuthorPaginationFilterDto, withDeleted?: boolean): Promise<PageDto<Author>>;
    private getFilter;
    save(item: Author): Promise<Author>;
    delete(item: Author): Promise<Author>;
}
