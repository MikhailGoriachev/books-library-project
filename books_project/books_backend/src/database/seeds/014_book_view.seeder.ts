import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Book } from '../entities/Book';
import { BookView } from '../entities/BookView';

export default class BookViewSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);

        const users = await userRepository.find();
        const books = await bookRepository.find();

        const n = 150;

        const bookViews = Array(n)
            .fill(0)
            .map((_) => {
                const user = randomInt(0, 10) < 3 ? null : users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];

                const date = new Date();
                date.setDate(-randomInt(10, 30));
                date.setHours(randomInt(1, 24));
                date.setMinutes(randomInt(1, 60));
                date.setSeconds(randomInt(1, 60));

                return new BookView(user, book, date);
            });

        return dataSource.getRepository(BookView).save(bookViews);
    }
}
