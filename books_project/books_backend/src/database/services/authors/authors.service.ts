import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from '../../entities/Author';
import { In, Repository } from 'typeorm';
import { getInById, getLike } from '../../../infrastructure/utils';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { Book } from '../../entities/Book';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorRepository: Repository<Author>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(filter?: AuthorFilterDto): Promise<Author[]> {
        return this.authorRepository.find({
            where: this.getFilter(filter),
            relations: ['books'],
        });
    }

    async findOne(filter?: AuthorFilterDto): Promise<Author> {
        return this.authorRepository.findOne({
            where: this.getFilter(filter),
            relations: ['books'],
        });
    }

    // получить фильтр по полям
    private getFilter(filter?: AuthorFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['name'] = getLike(filter.name);
        fields['description'] = getLike(filter.description);
        fields['detailsLink'] = getLike(filter.detailsLink);
        fields['image'] = getLike(filter.image);
        fields['books'] = filter.booksId !== undefined
            ? { id: In(filter.booksId) } : undefined;
        fields['books'] = getInById(filter.booksId);

        return fields;
    }

    async save(item: Author): Promise<Author> {
        return this.authorRepository.save(item);
    }
}
