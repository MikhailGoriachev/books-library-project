import { Repository } from 'typeorm';
import { AuthorView } from '../../entities/AuthorView';
import { AuthorViewFilterDto } from '../../../dto/filters/author-view-filter.dto';
import { Author } from '../../entities/Author';
import { User } from '../../entities/User';
export declare class AuthorViewsService {
    private authorViewRepository;
    private authorRepository;
    private userRepository;
    constructor(authorViewRepository: Repository<AuthorView>, authorRepository: Repository<Author>, userRepository: Repository<User>);
    findAll(filter?: AuthorViewFilterDto): Promise<AuthorView[]>;
    findOne(filter?: AuthorViewFilterDto): Promise<AuthorView>;
    private getFilter;
    save(item: AuthorView): Promise<AuthorView>;
}
