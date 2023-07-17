import { AuthorViewsService } from '../../../database/services/author-views/author-views.service';
import { AuthorViewDto } from '../../../dto/crud/author-view.dto';
import { AuthorView } from '../../../database/entities/AuthorView';
import { AuthorViewFilterDto } from '../../../dto/filters/author-view-filter.dto';
export declare class AuthorViewsController {
    private _authorViewsService;
    constructor(_authorViewsService: AuthorViewsService);
    findAll(filter: AuthorViewFilterDto): Promise<AuthorView[]>;
    findOne(filter: AuthorViewFilterDto): Promise<AuthorView>;
    findOneById(id: number): Promise<AuthorView>;
    create(item: AuthorViewDto): Promise<AuthorView>;
    update(item: AuthorViewDto): Promise<AuthorView>;
}
