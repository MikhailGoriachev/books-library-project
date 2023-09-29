import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { getBetween, getInById, getLike } from '../../../infrastructure/utils';
import { Book } from '../../entities/Book';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { Category } from '../../entities/Category';
import { Author } from '../../entities/Author';
import { PageOptionsDto } from '../../../dto/pagination/page-options.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { PageMetaDto } from '../../../dto/pagination/page-meta.dto';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
    ) {}

    async findAll(filter?: BookFilterDto, withDeleted: boolean = false): Promise<Book[]> {
        return this.bookRepository.find({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            withDeleted,
        });
    }

    public async findAllByPagination(filter: BookPaginationFilterDto,
                                     withDeleted: boolean = false): Promise<PageDto<Book>> {

        const count = await this.bookRepository.count({
            where: await this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            withDeleted,
            // order: { bookViewStatistic: { amount: 'DESC' } },
        });

        const items = await this.bookRepository.find({
            where: await this.getFilter(filter),
            skip: filter.skip,
            take: filter.take,
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            order: { deletedAt: 'ASC', bookRatingStatistic: { value: 'DESC' } },
            relationLoadStrategy: 'join',
            withDeleted,
        });

        const pageMetaDto = new PageMetaDto({
            itemCount: count,
            pageOptionsDto: filter,
        });

        return new PageDto(items, pageMetaDto);
    }

    async findOne(filter?: BookFilterDto, withDeleted: boolean = false): Promise<Book> {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            withDeleted,
        });
    }

    async findOneWithCartItems(filter?: BookFilterDto, withDeleted: boolean = false): Promise<Book> {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: [
                'categories',
                'authors',
                'bookFiles',
                'bookFiles.fileExtension',
                'bookRatingStatistic',
                'bookViewStatistic',
            ],
            withDeleted,
        });
    }

    // получить фильтр по полям
    private async getFilter(filter?: BookFilterDto): Promise<any> {
        const fields = {};

        fields['id'] = filter.id ?? (filter.ids ? In(filter.ids) : undefined);
        fields['title'] = getLike(filter.title);
        fields['description'] = getLike(filter.description);
        fields['price'] = filter.price ?? getBetween(filter.minPrice, filter.maxPrice);
        fields['publicationYear'] = filter.publicationYear ?? getBetween(filter.minPublicationYear,
            filter.maxPublicationYear);
        fields['image'] = getLike(filter.image);
        fields['isbn'] = getLike(filter.isbn);

        fields['categories'] = getInById(filter.categoriesId);

        fields['categories'] = fields['categories'] ?? (filter.categoryName
            ? { name: Like(filter.categoryName) } : undefined);

        fields['authors'] = getInById(filter.authorsId);

        fields['authors'] = fields['authors'] ?? (filter.authorName
            ? { name: Like(filter.authorName) } : undefined);

        return fields;
    }

    async save(item: Book): Promise<Book> {
        return this.bookRepository.save(item);
    }

    async delete(item: Book): Promise<Book> {
        return this.bookRepository.softRemove(item);
    }

    async getPriceRange(): Promise<any> {
        return {
            min: await this.bookRepository.minimum('price'),
            max: await this.bookRepository.maximum('price'),
        };
    }

    async getPublicationYearRange(): Promise<any> {
        return {
            min: await this.bookRepository.minimum('publicationYear'),
            max: await this.bookRepository.maximum('publicationYear'),
        };
    }

    // десять самых рейтинговых книг
    async topBooksByRating(): Promise<Book[]> {
        return this.bookRepository.find({
            order: { bookRatingStatistic: { value: 'DESC' } },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
    }

    // десять самых просматриваемых книг
    async topBooksByViewed(): Promise<Book[]> {
        return this.bookRepository.find({
            order: { bookViewStatistic: { amount: 'DESC' } },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
    }

    // десять последних добавленных книг
    async topBooksByAddition(): Promise<Book[]> {
        return this.bookRepository.find({
            order: { createdAt: 'DESC' },
            take: 10,
            relations: ['categories', 'authors', 'bookFiles', 'bookFiles.fileExtension', 'bookRatings', 'bookRatingStatistic', 'bookViewStatistic'],
            relationLoadStrategy: 'join',
        });
    }
}
