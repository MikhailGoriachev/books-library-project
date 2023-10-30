import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Author } from '../entities/Author';
import { AuthorView } from '../entities/AuthorView';
import { AuthorViewStatistic } from '../entities/AuthorViewStatistic';
import { addDays } from 'date-fns';

export default class AuthorViewSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const authorRepository = dataSource.getRepository(Author);
        const authorViewStatisticRepository = dataSource.getRepository(AuthorViewStatistic);

        const users = await userRepository.find();
        const authors = await authorRepository.find();

        const n = 10_000;

        const guest = users.find(u => u.name === 'guest');
        
        const minDays = -30, maxDays = 0;

        const authorViews = Array(n)
            .fill(0)
            .map((_) => {
                const user = randomInt(0, 10) < 3 ? guest : users[randomInt(0, users.length)];
                const author = authors[randomInt(0, authors.length)];
                
                const date = addDays(new Date(), randomInt(minDays, maxDays));
                
                date.setHours(randomInt(1, 24));
                date.setMinutes(randomInt(1, 60));
                date.setSeconds(randomInt(1, 60));

                return new AuthorView(user, author, date);
            });

        const authorViewStatistics = await authorViewStatisticRepository.find({ relations: ['author'] });

        for (const v of authorViews) {
            let statistic = authorViewStatistics.find(s => s.author.id === v.author.id);

            if (!statistic) {
                statistic = new AuthorViewStatistic(v.author, 0);
                authorViewStatistics.push(statistic);
            }
            statistic.amount++;
        }

        await authorViewStatisticRepository.save(authorViewStatistics);

        return dataSource.getRepository(AuthorView).save(authorViews);
    }
}
