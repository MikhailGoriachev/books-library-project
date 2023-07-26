import { CategoryViewsService } from '../../../database/services/category-views/category-views.service';
import { CategoryViewFilterDto } from '../../../dto/filters/category-view-filter.dto';
import { CategoryViewDto } from '../../../dto/crud/category-view.dto';
import { CategoryView } from '../../../database/entities/CategoryView';
export declare class CategoryViewsController {
    private _categoryViewsService;
    constructor(_categoryViewsService: CategoryViewsService);
    findAll(filter: CategoryViewFilterDto): Promise<CategoryView[]>;
    findOne(filter: CategoryViewFilterDto): Promise<CategoryView>;
    findOneById(id: number): Promise<CategoryView>;
    create(item: CategoryViewDto): Promise<CategoryView>;
    update(item: CategoryViewDto): Promise<CategoryView>;
}
