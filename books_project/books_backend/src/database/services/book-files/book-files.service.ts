import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookFile } from '../../entities/BookFile';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { BookFileFilterDto } from '../../../dto/filters/book-file-filter.dto';
import { Book } from '../../entities/Book';
import { FileExtension } from '../../entities/FileExtension';

@Injectable()
export class BookFilesService {
    constructor(
        @InjectRepository(BookFile)
        private bookFileRepository: Repository<BookFile>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
        @InjectRepository(FileExtension)
        private fileExtensionRepository: Repository<FileExtension>,
    ) {}

    async findAll(filter?: BookFileFilterDto): Promise<BookFile[]> {
        return this.bookFileRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: BookFileFilterDto): Promise<BookFile> {
        return this.bookFileRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: BookFileFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['path'] = getLike(filter.path);
        fields['fileExtension'] = this.fileExtensionRepository.findOneBy({ id: filter.fileExtensionId });
        fields['book'] = this.bookRepository.findOneBy({ id: filter.bookId });
        
        return fields;
    }

    async save(item: BookFile): Promise<BookFile> {
        return this.bookFileRepository.save(item);
    }
}
