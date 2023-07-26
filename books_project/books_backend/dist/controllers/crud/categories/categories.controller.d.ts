import { CategoriesService } from '../../../database/services/categories/categories.service';
import { CategoryFilterDto } from '../../../dto/filters/category-filter.dto';
import { CategoryDto } from '../../../dto/crud/category.dto';
import { Category } from '../../../database/entities/Category';
export declare class CategoriesController {
    private _categoriesService;
    constructor(_categoriesService: CategoriesService);
    findAll(filter: CategoryFilterDto): Promise<Category[]>;
    findOne(filter: CategoryFilterDto): Promise<Category>;
    findOneById(id: number): Promise<Category>;
    create(item: CategoryDto): Promise<Category>;
    update(item: CategoryDto): Promise<Category>;
}
