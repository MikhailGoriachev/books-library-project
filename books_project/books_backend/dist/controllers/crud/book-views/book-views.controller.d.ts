import { BookViewsService } from '../../../database/services/book-views/book-views.service';
import { BookViewFilterDto } from '../../../dto/filters/book-view-filter.dto';
import { BookViewDto } from '../../../dto/crud/book-view.dto';
import { BookView } from '../../../database/entities/BookView';
export declare class BookViewsController {
    private _bookViewsService;
    constructor(_bookViewsService: BookViewsService);
    findAll(filter: BookViewFilterDto): Promise<BookView[]>;
    findOne(filter: BookViewFilterDto): Promise<BookView>;
    findOneById(id: number): Promise<BookView>;
    create(item: BookViewDto): Promise<BookView>;
    update(item: BookViewDto): Promise<BookView>;
}
