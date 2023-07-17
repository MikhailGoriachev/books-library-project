import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { CategoryFilterDto } from '../../../dto/filters/category-filter.dto';
export declare class CategoriesService {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    findAll(filter?: CategoryFilterDto): Promise<Category[]>;
    findOne(filter?: CategoryFilterDto): Promise<Category>;
    private getFilter;
    save(item: Category): Promise<Category>;
}
