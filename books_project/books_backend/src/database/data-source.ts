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
import { ExpiredToken } from './entities/ExpiredToken';
import { BookRatingStatistic } from './entities/BookRatingStatistic';
import { BookViewStatistic } from './entities/BookViewStatistic';
import { CategoryViewStatistic } from './entities/CategoryViewStatistic';
import { AuthorViewStatistic } from './entities/AuthorViewStatistic';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

// раскомментировать для заполнения
// export const options: DataSourceOptions & SeederOptions = {

export const entities: EntityClassOrSchema[] = [
    User,
    Author,
    Category,
    FileExtension,
    Role,
    Book,
    BookFile,
    Sale,
    BookRating,
    BookRatingStatistic,
    UserCartItem,
    BookView,
    BookViewStatistic,
    AuthorView,
    AuthorViewStatistic,
    CategoryView,
    CategoryViewStatistic,
    BlockedUser,
    UserPassword,
    ExpiredToken,
];

// раскомментировать для работы
export const appDataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    // host: 'db',
    // host: 'localhost',
    // host: 'host.docker.internal',
    // port: 3306,
    // port: 3306,
    // username: 'root',
    // password: 'aA123456',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE_NAME,
    entities: entities,
    relationLoadStrategy: 'query',

    // TODO: убрать при проде
    synchronize: true,

    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
};

// раскомментировать для заполнения
export const AppDataSource = new DataSource(appDataSourceOptions);
