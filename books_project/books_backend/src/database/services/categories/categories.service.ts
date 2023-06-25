import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/Category';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { CategoryFilterDto } from '../../../dto/filters/category-filter.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(filter?: CategoryFilterDto): Promise<Category[]> {
        return this.categoryRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: CategoryFilterDto): Promise<Category> {
        return this.categoryRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: CategoryFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['name'] = getLike(filter.name);

        return fields;
    }

    async save(item: Category): Promise<Category> {
        return this.categoryRepository.save(item);
    }
}
