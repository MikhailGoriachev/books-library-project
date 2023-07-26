"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BookFile_1 = require("../entities/BookFile");
const FileExtension_1 = require("../entities/FileExtension");
const Book_1 = require("../entities/Book");
class BookFileSeeder {
    async run(dataSource, factoryManager) {
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const fileExtensionRepository = dataSource.getRepository(FileExtension_1.FileExtension);
        const bookFileRepository = dataSource.getRepository(BookFile_1.BookFile);
        const books = await bookRepository.find();
        const fileExtensions = await fileExtensionRepository.find();
        const bookFiles = [];
        for (const book of books) {
            for (const extension of fileExtensions) {
                const file = await factoryManager.get(BookFile_1.BookFile).make();
                file.book = book;
                file.fileExtension = extension;
                bookFiles.push(file);
            }
        }
        return bookFileRepository.save(bookFiles);
    }
}
exports.default = BookFileSeeder;
//# sourceMappingURL=005_book_file.seeder.js.map