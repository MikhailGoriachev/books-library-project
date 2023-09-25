﻿import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Category } from '../entities/Category';
import { CategoryView } from '../entities/CategoryView';
import { AuthorViewStatistic } from '../entities/AuthorViewStatistic';
import { CategoryViewStatistic } from '../entities/CategoryViewStatistic';

export default class CategoryViewSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const categoryRepository = dataSource.getRepository(Category);
        const categoryViewStatisticRepository = dataSource.getRepository(CategoryViewStatistic);

        const users = await userRepository.find();
        const categories = await categoryRepository.find();

        const n = 300;
        
        const guest = users.find(u => u.name === 'guest');

        const categoryViews = Array(n)
            .fill(0)
            .map((_) => {
                const user = randomInt(0, 10) < 3 ? guest : users[randomInt(0, users.length)];
                const category = categories[randomInt(0, categories.length)];

                const date = new Date();
                date.setDate(-randomInt(10, 30));
                date.setHours(randomInt(1, 24));
                date.setMinutes(randomInt(1, 60));
                date.setSeconds(randomInt(1, 60));

                return new CategoryView(user, category, date);
            });

        const authorViewStatistics = await categoryViewStatisticRepository.find({ relations: ['category'] });

        for (const v of categoryViews) {
            let statistic = authorViewStatistics.find(s => s.category.id === v.category.id);

            if (!statistic) {
                statistic = new CategoryViewStatistic(v.category, 0);
                authorViewStatistics.push(statistic);
            }
            statistic.amount++;
        }

        await categoryViewStatisticRepository.save(authorViewStatistics);

        return dataSource.getRepository(CategoryView).save(categoryViews);
    }
}
