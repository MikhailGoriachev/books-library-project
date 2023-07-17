import { CategoryView } from '../../entities/CategoryView';
import { Repository } from 'typeorm';
import { CategoryViewFilterDto } from '../../../dto/filters/category-view-filter.dto';
import { Category } from '../../entities/Category';
import { User } from '../../entities/User';
export declare class CategoryViewsService {
    private categoryViewRepository;
    private categoryRepository;
    private userRepository;
    constructor(categoryViewRepository: Repository<CategoryView>, categoryRepository: Repository<Category>, userRepository: Repository<User>);
    findAll(filter?: CategoryViewFilterDto): Promise<CategoryView[]>;
    findOne(filter?: CategoryViewFilterDto): Promise<CategoryView>;
    private getFilter;
    save(item: CategoryView): Promise<CategoryView>;
}
