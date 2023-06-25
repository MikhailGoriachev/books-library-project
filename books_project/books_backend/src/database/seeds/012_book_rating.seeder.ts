import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/User';
import { randomInt } from 'crypto';
import { Book } from '../entities/Book';
import { BookRating } from '../entities/BookRating';

export default class BookRatingSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const bookRepository = dataSource.getRepository(Book);

        const users = await userRepository.find();
        const books = await bookRepository.find();

        const n = 150;
        const minValue = 1;
        const maxValue = 6;

        let bookRatings = Array(n)
            .fill(0)
            .map((_) => {
                const user = users[randomInt(0, users.length)];
                const book = books[randomInt(0, books.length)];

                return new BookRating(
                    user,
                    book,
                    randomInt(minValue, maxValue),
                );
            });

        bookRatings = bookRatings.filter((item, index) => !bookRatings.slice(0, index).some(
            (uniqueItem) => item.user === uniqueItem.user && item.book === uniqueItem.book),
        );

        return dataSource.getRepository(BookRating).save(bookRatings);
    }
}
