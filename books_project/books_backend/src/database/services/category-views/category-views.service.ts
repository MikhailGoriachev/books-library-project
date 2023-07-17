import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryView } from '../../entities/CategoryView';
import { Repository } from 'typeorm';
import { getDateBetween } from '../../../infrastructure/utils';
import { CategoryViewFilterDto } from '../../../dto/filters/category-view-filter.dto';
import { Category } from '../../entities/Category';
import { User } from '../../entities/User';

@Injectable()
export class CategoryViewsService {
    constructor(
        @InjectRepository(CategoryView)
        private categoryViewRepository: Repository<CategoryView>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAll(filter?: CategoryViewFilterDto): Promise<CategoryView[]> {
        return this.categoryViewRepository.find({
            where: this.getFilter(filter),
            relations: ['user', 'category'],
        });
    }

    async findOne(filter?: CategoryViewFilterDto): Promise<CategoryView> {
        return this.categoryViewRepository.findOne({
            where: this.getFilter(filter),
            relations: ['user', 'category'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: CategoryViewFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['category'] = this.categoryRepository.findOneBy({ id: filter.categoryId });
        fields['viewedAt'] = filter.viewedAt ?? getDateBetween(filter.minViewedAt, filter.maxViewedAt);

        return fields;
    }

    async save(item: CategoryView): Promise<CategoryView> {
        return this.categoryViewRepository.save(item);
    }
}
