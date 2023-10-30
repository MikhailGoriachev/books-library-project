import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Book } from '../entities/Book';
import { BookRating } from '../entities/BookRating';
import { UserCartItem } from '../entities/UserCartItem';
import { Sale } from '../entities/Sale';

export default class UserCartItemSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);
        const saleRepository = dataSource.getRepository(Sale);

        const users = (await userRepository.find()).slice(2);
        const books = await bookRepository.find();
        const sales = await saleRepository.find();

        const n = 1000;

        let userCartItems = Array(n)
            .fill(0)
            .map((_) => {
                const user = users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];

                return new UserCartItem(user, book);
            });

        userCartItems = userCartItems.filter((item, index) => !userCartItems.slice(0, index).some(
                (uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book)
            && !sales.some(s => item.user === s.user && item.book === s.book),
        );

        return dataSource.getRepository(UserCartItem).save(userCartItems);
    }
}
