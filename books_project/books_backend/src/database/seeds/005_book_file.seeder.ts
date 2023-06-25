import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { BookFile } from '../entities/BookFile';
import { FileExtension } from '../entities/FileExtension';
import { Book } from '../entities/Book';

export default class BookFileSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const bookRepository = dataSource.getRepository(Book);
        const fileExtensionRepository = dataSource.getRepository(FileExtension);
        const bookFileRepository = dataSource.getRepository(BookFile);

        const books = await bookRepository.find();
        const fileExtensions = await fileExtensionRepository.find();

        const bookFiles = [];

        for (const book of books) {
            for (const extension of fileExtensions) {
                const file = await factoryManager.get(BookFile).make();
                file.book = book;
                file.fileExtension = extension;
                bookFiles.push(file);
            }
        }

        return bookFileRepository.save(bookFiles);
    }
}