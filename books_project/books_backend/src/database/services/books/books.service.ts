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
        return this.bookRepository.find({ where: await this.getFilter(filter) });
    }

    async findOne(filter?: BookFilterDto): Promise<Book> {
        return this.bookRepository.findOne({ where: await this.getFilter(filter) });
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
            ? In(filter.categoriesId.map(c => this.categoryRepository.findOneBy({ id: c })))
            : undefined;

        const categories = await this.categoryRepository.findBy({ name: Like(filter.categoryName) });

        fields['categories'] = fields['categories'] ?? (filter.categoryName !== undefined
            ? In(categories)
            : undefined);

        fields['authors'] = filter.authorsId !== undefined
            ? In(filter.authorsId.map(a => this.authorRepository.findOneBy({ id: a })))
            : undefined;

        const authors = await this.authorRepository.findBy({ name: Like(filter.authorName) });

        fields['authors'] = fields['authors'] ?? (filter.authorName !== undefined
            ? In(authors)
            : undefined);

        return fields;
    }

    async save(item: Book): Promise<Book> {
        return this.bookRepository.save(item);
    }
}
