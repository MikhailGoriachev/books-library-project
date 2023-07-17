import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBetween, getById } from '../../../infrastructure/utils';
import { Category } from '../../entities/Category';
import { CategoryViewStatistic } from '../../entities/CategoryViewStatistic';
import { CategoryViewStatisticFilterDto } from '../../../dto/filters/category-view-statistic-filter.dto';

@Injectable()
export class CategoryViewStatisticsService {
    constructor(
        @InjectRepository(CategoryViewStatistic)
        private categoryViewStatisticRepository: Repository<CategoryViewStatistic>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(filter?: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic[]> {
        return this.categoryViewStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['category'],
        });
    }

    async findOne(filter?: CategoryViewStatisticFilterDto): Promise<CategoryViewStatistic> {
        return this.categoryViewStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['category'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: CategoryViewStatisticFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['category'] = getById(filter.categoryId);
        fields['amount'] = filter.amount ?? getBetween(filter.minAmount, filter.maxAmount);

        return fields;
    }

    async save(item: CategoryViewStatistic): Promise<CategoryViewStatistic> {
        return this.categoryViewStatisticRepository.save(item);
    }
}
