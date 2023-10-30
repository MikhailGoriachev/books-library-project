"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Sale_1 = require("../entities/Sale");
const Book_1 = require("../entities/Book");
const date_fns_1 = require("date-fns");
class SaleSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const users = (await userRepository.find()).slice(2);
        const books = await bookRepository.find();
        const n = 1000;
        const minDays = -30, maxDays = 0;
        let sales = Array(n)
            .fill(0)
            .map((_) => {
            const user = users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            const date = (0, date_fns_1.addDays)(new Date(), (0, crypto_1.randomInt)(minDays, maxDays));
            return new Sale_1.Sale(user, book, book.price, date);
        });
        sales = sales.filter((item, index) => !sales.slice(0, index).some((uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book));
        return dataSource.getRepository(Sale_1.Sale).save(sales);
    }
}
exports.default = SaleSeeder;
//# sourceMappingURL=011_sale.seeder.js.map