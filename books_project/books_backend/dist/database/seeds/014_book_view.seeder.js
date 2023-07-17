"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Book_1 = require("../entities/Book");
const BookView_1 = require("../entities/BookView");
class BookViewSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const users = await userRepository.find();
        const books = await bookRepository.find();
        const n = 150;
        const bookViews = Array(n)
            .fill(0)
            .map((_) => {
            const user = (0, crypto_1.randomInt)(0, 10) < 3 ? null : users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            const date = new Date();
            date.setDate(-(0, crypto_1.randomInt)(10, 30));
            date.setHours((0, crypto_1.randomInt)(1, 24));
            date.setMinutes((0, crypto_1.randomInt)(1, 60));
            date.setSeconds((0, crypto_1.randomInt)(1, 60));
            return new BookView_1.BookView(user, book, date);
        });
        return dataSource.getRepository(BookView_1.BookView).save(bookViews);
    }
}
exports.default = BookViewSeeder;
//# sourceMappingURL=014_book_view.seeder.js.map