import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Book } from '../entities/Book';
import { Author } from '../entities/Author';

export default class AuthorSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const bookRepository = dataSource.getRepository(Book);
        const authorRepository = dataSource.getRepository(Author);

        const books = await bookRepository.find();
        const authors = await authorRepository.find();

        // Лев Толстой: ["Война и мир", "Анна Каренина"]
        authors[0].books = [books[0], books[2]];
        // Фёдор Достоевский: ["Преступление и наказание", "Братья Карамазовы"]
        authors[1].books = [books[1], books[5]];
        // Михаил Булгаков: ["Мастер и Маргарита"]
        authors[2].books = [books[3]];
        // Михаил Лермонтов: ["Герой нашего времени"]
        authors[3].books = [books[4]];
        // Александр Пушкин: ["Дубровский", "Евгений Онегин", "Пиковая дама"]
        authors[4].books = [books[6], books[7], books[14]];
        // Иван Тургенев: ["Отцы и дети"]
        authors[5].books = [books[8]];
        // Жюль Верн: ["Дети капитана Гранта"]
        authors[6].books = [books[9]];
        // Михаил Шолохов: ["Тихий Дон"]
        authors[7].books = [books[10]];
        // Илья Ильф: ["12 стульев"]
        authors[8].books = [books[11]];
        // Алексей Толстой: ["Двенадцать"]
        authors[9].books = [books[12]];
        // Николай Гоголь: ["Мёртвые души", "Похождения Чичикова, или Мёртвые души"]
        authors[10].books = [books[13], books[18]];
        // Дмитрий Глуховский: ["Метро 2033"]
        authors[11].books = [books[15]];
        // Иван Гончаров: ["Обломов"]
        authors[12].books = [books[16]];
        // Юрий Михайлович Нагибин: ["Мастер"]
        authors[13].books = [books[17]];
        // Евгений Петров: ["12 стульев"]
        authors[14].books = [books[11]];

        return authorRepository.save(authors);
    }
}
