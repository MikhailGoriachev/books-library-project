import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Category } from '../entities/Category';
import { CategoryView } from '../entities/CategoryView';

export default class CategoryViewSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const categoryRepository = dataSource.getRepository(Category);

        const users = await userRepository.find();
        const categories = await categoryRepository.find();

        const n = 300;

        const categoryViews = Array(n)
            .fill(0)
            .map((_) => {
                const user = randomInt(0, 10) < 3 ? null : users[randomInt(0, users.length)];
                const category = categories[randomInt(0, categories.length)];

                const date = new Date();
                date.setDate(-randomInt(10, 30));
                date.setHours(randomInt(1, 24));
                date.setMinutes(randomInt(1, 60));
                date.setSeconds(randomInt(1, 60));

                return new CategoryView(user, category, date);
            });

        return dataSource.getRepository(CategoryView).save(categoryViews);
    }
}
