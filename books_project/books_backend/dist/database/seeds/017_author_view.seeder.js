"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Author_1 = require("../entities/Author");
const AuthorView_1 = require("../entities/AuthorView");
class AuthorViewSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const authorRepository = dataSource.getRepository(Author_1.Author);
        const users = await userRepository.find();
        const authors = await authorRepository.find();
        const n = 150;
        const authorViews = Array(n)
            .fill(0)
            .map((_) => {
            const user = (0, crypto_1.randomInt)(0, 10) < 3 ? null : users[(0, crypto_1.randomInt)(0, users.length)];
            const author = authors[(0, crypto_1.randomInt)(0, authors.length)];
            const date = new Date();
            date.setDate(-(0, crypto_1.randomInt)(10, 30));
            date.setHours((0, crypto_1.randomInt)(1, 24));
            date.setMinutes((0, crypto_1.randomInt)(1, 60));
            date.setSeconds((0, crypto_1.randomInt)(1, 60));
            return new AuthorView_1.AuthorView(user, author, date);
        });
        return dataSource.getRepository(AuthorView_1.AuthorView).save(authorViews);
    }
}
exports.default = AuthorViewSeeder;
//# sourceMappingURL=017_author_view.seeder.js.map