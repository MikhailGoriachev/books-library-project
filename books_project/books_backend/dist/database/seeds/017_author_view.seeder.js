"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Author_1 = require("../entities/Author");
const AuthorView_1 = require("../entities/AuthorView");
const AuthorViewStatistic_1 = require("../entities/AuthorViewStatistic");
const date_fns_1 = require("date-fns");
class AuthorViewSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const authorRepository = dataSource.getRepository(Author_1.Author);
        const authorViewStatisticRepository = dataSource.getRepository(AuthorViewStatistic_1.AuthorViewStatistic);
        const users = await userRepository.find();
        const authors = await authorRepository.find();
        const n = 10000;
        const guest = users.find(u => u.name === 'guest');
        const minDays = -30, maxDays = 0;
        const authorViews = Array(n)
            .fill(0)
            .map((_) => {
            const user = (0, crypto_1.randomInt)(0, 10) < 3 ? guest : users[(0, crypto_1.randomInt)(0, users.length)];
            const author = authors[(0, crypto_1.randomInt)(0, authors.length)];
            const date = (0, date_fns_1.addDays)(new Date(), (0, crypto_1.randomInt)(minDays, maxDays));
            date.setHours((0, crypto_1.randomInt)(1, 24));
            date.setMinutes((0, crypto_1.randomInt)(1, 60));
            date.setSeconds((0, crypto_1.randomInt)(1, 60));
            return new AuthorView_1.AuthorView(user, author, date);
        });
        const authorViewStatistics = await authorViewStatisticRepository.find({ relations: ['author'] });
        for (const v of authorViews) {
            let statistic = authorViewStatistics.find(s => s.author.id === v.author.id);
            if (!statistic) {
                statistic = new AuthorViewStatistic_1.AuthorViewStatistic(v.author, 0);
                authorViewStatistics.push(statistic);
            }
            statistic.amount++;
        }
        await authorViewStatisticRepository.save(authorViewStatistics);
        return dataSource.getRepository(AuthorView_1.AuthorView).save(authorViews);
    }
}
exports.default = AuthorViewSeeder;
//# sourceMappingURL=017_author_view.seeder.js.map