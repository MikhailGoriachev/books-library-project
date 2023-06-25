import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../entities/Category';
import { Book } from '../entities/Book';
import { randomInt } from 'crypto';

export default class BookCategorySeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const bookRepository = dataSource.getRepository(Book);
        const categoryRepository = dataSource.getRepository(Category);

        const books = await bookRepository.find();
        const categories = await categoryRepository.find();

        // for (const category of categories) {
        //     const start = randomInt(0, Math.floor(books.length / 2));
        //     category.books = books.slice(start, -randomInt(1, books.length - 1 - start));
        // }

        // 'Фантастика': ['Метро 2033']
        categories[0].books = [books[15]];

        // 'Романы': ['Война и мир', 'Анна Каренина', 'Мастер и Маргарита', 'Герой нашего времени', 
        // 'Братья Карамазовы',  'Дубровский', 'Евгений Онегин', 'Отцы и дети', 'Дети капитана Гранта', 'Тихий Дон',  
        // 'Мёртвые души', 'Пиковая дама', 'Мастер', 'Похождения Чичикова, или Мёртвые души']
        categories[2].books = [...books.slice(0, 11), books[13], books[14], books[17], books[18]];

        // 'Приключения': ['12 стульев', 'Двенадцать']
        categories[7].books = [books[11], books[12]];

        // 'Художественная проза': ['Преступление и наказание', 'Обломов', 'Мастер и Маргарита'
        categories[7].books = [books[1], books[16], books[3]];

        return dataSource.getRepository(Category).save(categories);
    }
}