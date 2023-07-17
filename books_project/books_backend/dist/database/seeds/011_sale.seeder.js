"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Sale_1 = require("../entities/Sale");
const Book_1 = require("../entities/Book");
class SaleSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const users = await userRepository.find();
        const books = await bookRepository.find();
        const n = 80;
        let sales = Array(n)
            .fill(0)
            .map((_) => {
            const user = users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            const date = new Date();
            date.setDate(-(0, crypto_1.randomInt)(10, 30));
            return new Sale_1.Sale(user, book, book.price, date);
        });
        sales = sales.filter((item, index) => !sales.slice(0, index).some((uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book));
        return dataSource.getRepository(Sale_1.Sale).save(sales);
    }
}
exports.default = SaleSeeder;
//# sourceMappingURL=011_sale.seeder.js.map