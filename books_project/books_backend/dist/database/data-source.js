"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.appDataSourceOptions = exports.entities = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Author_1 = require("./entities/Author");
const Category_1 = require("./entities/Category");
const FileExtension_1 = require("./entities/FileExtension");
const Role_1 = require("./entities/Role");
const Book_1 = require("./entities/Book");
const BookFile_1 = require("./entities/BookFile");
const Sale_1 = require("./entities/Sale");
const BookRating_1 = require("./entities/BookRating");
const UserCartItem_1 = require("./entities/UserCartItem");
const BookView_1 = require("./entities/BookView");
const AuthorView_1 = require("./entities/AuthorView");
const CategoryView_1 = require("./entities/CategoryView");
const BlockedUser_1 = require("./entities/BlockedUser");
const UserPassword_1 = require("./entities/UserPassword");
const ExpiredToken_1 = require("./entities/ExpiredToken");
const BookRatingStatistic_1 = require("./entities/BookRatingStatistic");
const BookViewStatistic_1 = require("./entities/BookViewStatistic");
const CategoryViewStatistic_1 = require("./entities/CategoryViewStatistic");
const AuthorViewStatistic_1 = require("./entities/AuthorViewStatistic");
const dotenv = require("dotenv");
const process = require("process");
dotenv.config();
exports.entities = [
    User_1.User,
    Author_1.Author,
    Category_1.Category,
    FileExtension_1.FileExtension,
    Role_1.Role,
    Book_1.Book,
    BookFile_1.BookFile,
    Sale_1.Sale,
    BookRating_1.BookRating,
    BookRatingStatistic_1.BookRatingStatistic,
    UserCartItem_1.UserCartItem,
    BookView_1.BookView,
    BookViewStatistic_1.BookViewStatistic,
    AuthorView_1.AuthorView,
    AuthorViewStatistic_1.AuthorViewStatistic,
    CategoryView_1.CategoryView,
    CategoryViewStatistic_1.CategoryViewStatistic,
    BlockedUser_1.BlockedUser,
    UserPassword_1.UserPassword,
    ExpiredToken_1.ExpiredToken,
];
exports.appDataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE_NAME,
    entities: exports.entities,
    relationLoadStrategy: 'query',
    synchronize: true,
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
};
exports.AppDataSource = new typeorm_1.DataSource(exports.appDataSourceOptions);
//# sourceMappingURL=data-source.js.map