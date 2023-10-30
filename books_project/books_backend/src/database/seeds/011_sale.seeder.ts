import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Sale } from '../entities/Sale';
import { Book } from '../entities/Book';
import { format, parseISO, addDays, isSameDay, startOfDay, endOfDay } from 'date-fns';

export default class SaleSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);

        const users = (await userRepository.find()).slice(2);
        const books = await bookRepository.find();

        const n = 1_000;
        const minDays = -30, maxDays = 0;

        let sales = Array(n)
            .fill(0)
            .map((_) => {
                const user = users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];
                const date = addDays(new Date(), randomInt(minDays, maxDays));

                return new Sale(
                    user,
                    book,
                    book.price,
                    date,
                );
            });

        sales = sales.filter((item, index) => !sales.slice(0, index).some(
            (uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book),
        );

        return dataSource.getRepository(Sale).save(sales);
    }
}
