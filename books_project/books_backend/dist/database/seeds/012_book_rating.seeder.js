"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Book_1 = require("../entities/Book");
const BookRating_1 = require("../entities/BookRating");
const BookRatingStatistic_1 = require("../entities/BookRatingStatistic");
const date_fns_1 = require("date-fns");
class BookRatingSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const bookRatingStatisticsRepository = dataSource.getRepository(BookRatingStatistic_1.BookRatingStatistic);
        const users = (await userRepository.find()).slice(2);
        const books = await bookRepository.find();
        const n = 1500;
        const minValue = 1;
        const maxValue = 6;
        let bookRatings = Array(n)
            .fill(0)
            .map((_) => {
            const user = users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            return new BookRating_1.BookRating(user, book, (0, crypto_1.randomInt)(minValue, maxValue));
        });
        const minDays = -30, maxDays = 0;
        bookRatings.forEach(r => {
            const date = (0, date_fns_1.addDays)(new Date(), (0, crypto_1.randomInt)(minDays, maxDays));
            date.setHours((0, crypto_1.randomInt)(1, 24));
            date.setMinutes((0, crypto_1.randomInt)(1, 60));
            date.setSeconds((0, crypto_1.randomInt)(1, 60));
            r.createdAt = date;
        });
        bookRatings = bookRatings.filter((item, index) => !bookRatings.slice(0, index).some((uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book));
        const statisticList = await bookRatingStatisticsRepository.find({ relations: ['book'] });
        for (const r of bookRatings) {
            let statistic = statisticList.find(s => s.book.id === r.book.id);
            if (!statistic) {
                statistic = new BookRatingStatistic_1.BookRatingStatistic(r.book, 0, 0);
                statisticList.push(statistic);
            }
            statistic.amount++;
            statistic.value = (statistic.value + r.value) / 2;
        }
        await bookRatingStatisticsRepository.save(statisticList);
        return dataSource.getRepository(BookRating_1.BookRating).save(bookRatings);
    }
}
exports.default = BookRatingSeeder;
//# sourceMappingURL=012_book_rating.seeder.js.map