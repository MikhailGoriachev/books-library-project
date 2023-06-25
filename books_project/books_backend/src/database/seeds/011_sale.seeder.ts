import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Sale } from '../entities/Sale';
import { Book } from '../entities/Book';

export default class SaleSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);

        const users = await userRepository.find();
        const books = await bookRepository.find();

        const n = 80;

        let sales = Array(n)
            .fill(0)
            .map((_) => {
                const user = users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];
                const date = new Date();
                date.setDate(-randomInt(10, 30));

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
