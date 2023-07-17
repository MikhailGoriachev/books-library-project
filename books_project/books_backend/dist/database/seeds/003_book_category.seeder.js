"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../entities/Category");
const Book_1 = require("../entities/Book");
class BookCategorySeeder {
    async run(dataSource, factoryManager) {
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const categoryRepository = dataSource.getRepository(Category_1.Category);
        const books = await bookRepository.find();
        const categories = await categoryRepository.find();
        categories[0].books = [books[15]];
        categories[2].books = [...books.slice(0, 11), books[13], books[14], books[17], books[18]];
        categories[7].books = [books[11], books[12]];
        categories[7].books = [books[1], books[16], books[3]];
        return dataSource.getRepository(Category_1.Category).save(categories);
    }
}
exports.default = BookCategorySeeder;
//# sourceMappingURL=003_book_category.seeder.js.map