"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Book_1 = require("../entities/Book");
const UserCartItem_1 = require("../entities/UserCartItem");
const Sale_1 = require("../entities/Sale");
class UserCartItemSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const bookRepository = dataSource.getRepository(Book_1.Book);
        const saleRepository = dataSource.getRepository(Sale_1.Sale);
        const users = await userRepository.find();
        const books = await bookRepository.find();
        const sales = await saleRepository.find();
        const n = 200;
        let userCartItems = Array(n)
            .fill(0)
            .map((_) => {
            const user = users[(0, crypto_1.randomInt)(0, users.length)];
            const book = books[(0, crypto_1.randomInt)(0, books.length)];
            return new UserCartItem_1.UserCartItem(user, book);
        });
        userCartItems = userCartItems.filter((item, index) => !userCartItems.slice(0, index).some((uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book)
            && !sales.some(s => item.user === s.user && item.book === s.book));
        return dataSource.getRepository(UserCartItem_1.UserCartItem).save(userCartItems);
    }
}
exports.default = UserCartItemSeeder;
//# sourceMappingURL=013_user_cart_item.seeder.js.map