import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBetween, getById } from '../../../infrastructure/utils';
import { AuthorView } from '../../entities/AuthorView';
import { Author } from '../../entities/Author';
import { AuthorViewStatistic } from '../../entities/AuthorViewStatistic';
import { AuthorViewStatisticFilterDto } from '../../../dto/filters/author-view-statistic-filter.dto';

@Injectable()
export class AuthorViewStatisticsService {
    constructor(
        @InjectRepository(AuthorViewStatistic)
        private authorViewStatisticRepository: Repository<AuthorViewStatistic>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) {}

    async findAll(filter?: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic[]> {
        return this.authorViewStatisticRepository.find({
            where: this.getFilter(filter),
            relations: ['author'],
        });
    }

    async findOne(filter?: AuthorViewStatisticFilterDto): Promise<AuthorViewStatistic> {
        return this.authorViewStatisticRepository.findOne({
            where: this.getFilter(filter),
            relations: ['author'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: AuthorViewStatisticFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['author'] = getById(filter.authorId);
        fields['amount'] = filter.amount ?? getBetween(filter.minAmount, filter.maxAmount);

        return fields;
    }

    async save(item: AuthorViewStatistic): Promise<AuthorViewStatistic> {
        return this.authorViewStatisticRepository.save(item);
    }
}
