import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../entities/Author';
import { In, Repository } from 'typeorm';
import { getInById, getLike } from '../../../infrastructure/utils';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { Book } from '../../entities/Book';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { PageMetaDto } from '../../../dto/pagination/page-meta.dto';
import { AuthorPaginationFilterDto } from '../../../dto/filters/author-pagination-filter.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(filter?: AuthorFilterDto, withDeleted: boolean = false): Promise<Author[]> {
        return this.authorRepository.find({
            where: this.getFilter(filter),
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
    }

    async findOne(filter?: AuthorFilterDto, withDeleted: boolean = false): Promise<Author> {
        return this.authorRepository.findOne({
            where: this.getFilter(filter),
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });
    }

    public async findAllByPagination(filter: AuthorPaginationFilterDto,
                                     withDeleted: boolean = false): Promise<PageDto<Author>> {
        const count = await this.authorRepository.count({
            where: this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });

        const items = await this.authorRepository.find({
            where: { ...this.getFilter(filter) },
            skip: filter.skip,
            take: filter.take,
            relations: ['books', 'authorViewStatistic'],
            withDeleted,
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });

        return new PageDto(items, pageMetaDto);
    }

    // получить фильтр по полям
    private getFilter(filter?: AuthorFilterDto): object {
        const fields = {};

        fields['id'] = filter.id ?? (filter.ids ? In(filter.ids) : undefined);
        fields['name'] = getLike(filter.name);
        fields['description'] = getLike(filter.description);
        fields['detailsLink'] = getLike(filter.detailsLink);
        fields['image'] = getLike(filter.image);
        fields['books'] = getInById(filter.booksId);

        return fields;
    }

    async save(item: Author): Promise<Author> {
        return this.authorRepository.save(item);
    }

    async delete(item: Author): Promise<Author> {
        return this.authorRepository.softRemove(item);
    }
}
