import { AuthorsService } from '../../../database/services/authors/authors.service';
import { AuthorDto } from '../../../dto/crud/author.dto';
import { Author } from '../../../database/entities/Author';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
export declare class AuthorsController {
    private _authorService;
    constructor(_authorService: AuthorsService);
    findAll(filter: AuthorFilterDto): Promise<Author[]>;
    findOne(filter: AuthorFilterDto): Promise<Author>;
    findOneById(id: number): Promise<Author>;
    create(item: AuthorDto): Promise<Author>;
    update(item: AuthorDto): Promise<Author>;
}
