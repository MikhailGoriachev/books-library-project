"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Book_1 = require("../entities/Book");
const BookRating_1 = require("../entities/BookRating");
class BookRatingSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const users = await userRepository.find();
        const books = await bookRepository.find();
        const n = 150;
        const minValue = 1;
        const maxValue = 6;
        let bookRatings = Array(n)
            .fill(0)
            .map((_) => {
            const user = users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            return new BookRating_1.BookRating(user, book, (0, crypto_1.randomInt)(minValue, maxValue));
        });
        bookRatings = bookRatings.filter((item, index) => !bookRatings.slice(0, index).some((uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book));
        return dataSource.getRepository(BookRating_1.BookRating).save(bookRatings);
    }
}
exports.default = BookRatingSeeder;
//# sourceMappingURL=012_book_rating.seeder.js.map