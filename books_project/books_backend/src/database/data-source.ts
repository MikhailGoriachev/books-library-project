import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/User';
import { Author } from './entities/Author';
import { Category } from './entities/Category';
import { FileExtension } from './entities/FileExtension';
import { Role } from './entities/Role';
import { Book } from './entities/Book';
import { BookFile } from './entities/BookFile';
import { Sale } from './entities/Sale';
import { BookRating } from './entities/BookRating';
import { UserCartItem } from './entities/UserCartItem';
import { BookView } from './entities/BookView';
import { AuthorView } from './entities/AuthorView';
import { CategoryView } from './entities/CategoryView';
import { BlockedUser } from './entities/BlockedUser';
import { UserPassword } from './entities/UserPassword';
import { SeederOptions } from 'typeorm-extension';

// раскомментировать для заполнения
// export const options: DataSourceOptions & SeederOptions = {

// раскомментировать для работы
export const appDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'aA123456',
    database: 'books_db_goriachev',
    entities: [User, Author, Category, FileExtension, Role, Book, BookFile, Sale, BookRating, UserCartItem, BookView, AuthorView, CategoryView, BlockedUser, UserPassword],
    synchronize: true,

    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
};

// раскомментировать для заполнения
// export const AppDataSource = new DataSource(options);
