"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
const crypto_1 = require("crypto");
const Category_1 = require("../entities/Category");
const CategoryView_1 = require("../entities/CategoryView");
const CategoryViewStatistic_1 = require("../entities/CategoryViewStatistic");
const date_fns_1 = require("date-fns");
class CategoryViewSeeder {
    async run(dataSource, factoryManager) {
        const userRepository = dataSource.getRepository(User_1.User);
        const categoryRepository = dataSource.getRepository(Category_1.Category);
        const categoryViewStatisticRepository = dataSource.getRepository(CategoryViewStatistic_1.CategoryViewStatistic);
        const users = await userRepository.find();
        const categories = await categoryRepository.find();
        const n = 10000;
        const guest = users.find(u => u.name === 'guest');
        const minDays = -30, maxDays = 0;
        const categoryViews = Array(n)
            .fill(0)
            .map((_) => {
            const user = (0, crypto_1.randomInt)(0, 10) < 3 ? guest : users[(0, crypto_1.randomInt)(0, users.length)];
            const category = categories[(0, crypto_1.randomInt)(0, categories.length)];
            const date = (0, date_fns_1.addDays)(new Date(), (0, crypto_1.randomInt)(minDays, maxDays));
            date.setHours((0, crypto_1.randomInt)(1, 24));
            date.setMinutes((0, crypto_1.randomInt)(1, 60));
            date.setSeconds((0, crypto_1.randomInt)(1, 60));
            return new CategoryView_1.CategoryView(user, category, date);
        });
        const authorViewStatistics = await categoryViewStatisticRepository.find({ relations: ['category'] });
        for (const v of categoryViews) {
            let statistic = authorViewStatistics.find(s => s.category.id === v.category.id);
            if (!statistic) {
                statistic = new CategoryViewStatistic_1.CategoryViewStatistic(v.category, 0);
                authorViewStatistics.push(statistic);
            }
            statistic.amount++;
        }
        await categoryViewStatisticRepository.save(authorViewStatistics);
        return dataSource.getRepository(CategoryView_1.CategoryView).save(categoryViews);
    }
}
exports.default = CategoryViewSeeder;
//# sourceMappingURL=018_category_view.seeder.js.map