import { AuthorsService } from '../../../database/services/authors/authors.service';
import { AuthorDto } from '../../../dto/crud/author.dto';
import { Author } from '../../../database/entities/Author';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { AuthorPaginationFilterDto } from '../../../dto/filters/author-pagination-filter.dto';
export declare class AuthorsController {
    private _authorService;
    constructor(_authorService: AuthorsService);
    create(item: AuthorDto): Promise<Author>;
    update(item: AuthorDto): Promise<Author>;
    findAllWithDeleted(filter: AuthorFilterDto): Promise<Author[]>;
    findAllPaginationWithDeleted(pageOptionsDto: AuthorPaginationFilterDto): Promise<import("../../../dto/pagination/page.dto").PageDto<Author>>;
    findOneWithDeleted(filter: AuthorFilterDto): Promise<Author>;
    findOneByIdWithDeleted(id: number): Promise<Author>;
    findAll(filter: AuthorFilterDto): Promise<Author[]>;
    findAllPagination(pageOptionsDto: AuthorPaginationFilterDto): Promise<import("../../../dto/pagination/page.dto").PageDto<Author>>;
    findOne(filter: AuthorFilterDto): Promise<Author>;
    findOneById(id: number): Promise<Author>;
}
