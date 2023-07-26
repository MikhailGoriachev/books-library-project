"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../entities/Book");
const Author_1 = require("../entities/Author");
class AuthorSeeder {
    async run(dataSource, factoryManager) {
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const authorRepository = dataSource.getRepository(Author_1.Author);
        const books = await bookRepository.find();
        const authors = await authorRepository.find();
        authors[0].books = [books[0], books[2]];
        authors[1].books = [books[1], books[5]];
        authors[2].books = [books[3]];
        authors[3].books = [books[4]];
        authors[4].books = [books[6], books[7], books[14]];
        authors[5].books = [books[8]];
        authors[6].books = [books[9]];
        authors[7].books = [books[10]];
        authors[8].books = [books[11]];
        authors[9].books = [books[12]];
        authors[10].books = [books[13], books[18]];
        authors[11].books = [books[15]];
        authors[12].books = [books[16]];
        authors[13].books = [books[17]];
        authors[14].books = [books[11]];
        return authorRepository.save(authors);
    }
}
exports.default = AuthorSeeder;
//# sourceMappingURL=016_book_author.seeder.js.map