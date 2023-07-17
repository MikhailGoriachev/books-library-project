import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { getBetween, getLike } from '../../../infrastructure/utils';
import { Book } from '../../entities/Book';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { Category } from '../../entities/Category';
import { Author } from '../../entities/Author';

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

    async findAll(filter?: BookFilterDto): Promise<Book[]> {
        return this.bookRepository.find({
            where: await this.getFilter(filter),
            relations: ['categories', 'authors', 'bookFiles', 'bookRatings'],
        });
    }

    async findOne(filter?: BookFilterDto): Promise<Book> {
        return this.bookRepository.findOne({
            where: await this.getFilter(filter),
            relations: ['categories', 'authors', 'bookFiles', 'bookRatings'],
        });
    }

    // получить фильтр по полям
    private async getFilter(filter?: BookFilterDto): Promise<any> {
        const fields = {};

        fields['id'] = filter.id;
        fields['title'] = getLike(filter.title);
        fields['description'] = getLike(filter.description);
        fields['price'] = filter.price ?? getBetween(filter.minPrice, filter.maxPrice);
        fields['publicationYear'] = filter.publicationYear ?? getBetween(filter.minPublicationYear,
            filter.maxPublicationYear);
        fields['image'] = getLike(filter.image);
        fields['isbn'] = getLike(filter.isbn);

        fields['categories'] = filter.categoriesId !== undefined
            ? { id: In(filter.categoriesId) } : undefined;

        fields['categories'] = fields['categories'] ?? (filter.categoryName
            ? { name: Like(filter.categoryName) } : undefined);

        fields['authors'] = filter.authorsId !== undefined
            ? { id: In(filter.authorsId) } : undefined;

        fields['authors'] = fields['authors'] ?? (filter.authorName
            ? { name: Like(filter.authorName) } : undefined);

        return fields;
    }

    async save(item: Book): Promise<Book> {
        return this.bookRepository.save(item);
    }
}
