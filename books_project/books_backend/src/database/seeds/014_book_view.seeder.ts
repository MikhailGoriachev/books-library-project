import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Book } from '../entities/Book';
import { BookView } from '../entities/BookView';
import { BookViewStatistic } from '../entities/BookViewStatistic';
import { BookRatingStatistic } from '../entities/BookRatingStatistic';

export default class BookViewSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);
        const bookViewStatisticRepository = dataSource.getRepository(BookViewStatistic);

        const users = await userRepository.find();
        const books = await bookRepository.find();

        const n = 150;
        
        const guest = users.find(u => u.name === 'guest');

        const bookViews = Array(n)
            .fill(0)
            .map((_) => {
                const user = randomInt(0, 10) < 3 ? guest : users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];

                const date = new Date();
                date.setDate(-randomInt(10, 30));
                date.setHours(randomInt(1, 24));
                date.setMinutes(randomInt(1, 60));
                date.setSeconds(randomInt(1, 60));

                return new BookView(user, book, date);
            });
        
        const bookViewStatistics = await bookViewStatisticRepository.find({relations: ['book']});

        for (const r of bookViews) {
            let statistic = bookViewStatistics.find(s => s.book.id === r.book.id);
            
            if (!statistic) {
                statistic = new BookViewStatistic(r.book, 0);
                bookViewStatistics.push(statistic)
            }
            statistic.amount++;
        }

        await bookViewStatisticRepository.save(bookViewStatistics);

        return dataSource.getRepository(BookView).save(bookViews);
    }
}
