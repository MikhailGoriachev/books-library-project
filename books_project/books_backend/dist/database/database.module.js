"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./services/users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("./data-source");
const books_service_1 = require("./services/books/books.service");
const sales_service_1 = require("./services/sales/sales.service");
const author_views_service_1 = require("./services/author-views/author-views.service");
const blocked_users_service_1 = require("./services/blocked-users/blocked-users.service");
const book_ratings_service_1 = require("./services/book-ratings/book-ratings.service");
const book_views_service_1 = require("./services/book-views/book-views.service");
const categories_service_1 = require("./services/categories/categories.service");
const file_extensions_service_1 = require("./services/file-extensions/file-extensions.service");
const roles_service_1 = require("./services/roles/roles.service");
const user_cart_items_service_1 = require("./services/user-cart-items/user-cart-items.service");
const user_passwords_service_1 = require("./services/user-passwords/user-passwords.service");
const book_files_service_1 = require("./services/book-files/book-files.service");
const category_views_service_1 = require("./services/category-views/category-views.service");
const authors_service_1 = require("./services/authors/authors.service");
const expired_tokens_service_1 = require("./services/expired-tokens/expired-tokens.service");
const author_view_statistics_service_1 = require("./services/author-view-statistics/author-view-statistics.service");
const book_rating_statistics_service_1 = require("./services/book-rating-statistics/book-rating-statistics.service");
const book_view_statistics_service_1 = require("./services/book-view-statistics/book-view-statistics.service");
const category_view_statistics_service_1 = require("./services/category-view-statistics/category-view-statistics.service");
let DatabaseModule = exports.DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.AppDataSource.options),
            typeorm_1.TypeOrmModule.forFeature(data_source_1.AppDataSource.options.entities),
        ],
        exports: [
            users_service_1.UsersService,
            authors_service_1.AuthorsService,
            books_service_1.BooksService,
            sales_service_1.SalesService,
            author_views_service_1.AuthorViewsService,
            author_view_statistics_service_1.AuthorViewStatisticsService,
            blocked_users_service_1.BlockedUsersService,
            book_ratings_service_1.BookRatingsService,
            book_rating_statistics_service_1.BookRatingStatisticsService,
            book_views_service_1.BookViewsService,
            book_view_statistics_service_1.BookViewStatisticsService,
            categories_service_1.CategoriesService,
            category_views_service_1.CategoryViewsService,
            category_view_statistics_service_1.CategoryViewStatisticsService,
            file_extensions_service_1.FileExtensionsService,
            roles_service_1.RolesService,
            user_cart_items_service_1.UserCartItemsService,
            user_passwords_service_1.UserPasswordsService,
            book_files_service_1.BookFilesService,
            expired_tokens_service_1.ExpiredTokensService,
        ],
        providers: [
            users_service_1.UsersService,
            authors_service_1.AuthorsService,
            books_service_1.BooksService,
            sales_service_1.SalesService,
            author_views_service_1.AuthorViewsService,
            author_view_statistics_service_1.AuthorViewStatisticsService,
            blocked_users_service_1.BlockedUsersService,
            book_ratings_service_1.BookRatingsService,
            book_rating_statistics_service_1.BookRatingStatisticsService,
            book_views_service_1.BookViewsService,
            book_view_statistics_service_1.BookViewStatisticsService,
            categories_service_1.CategoriesService,
            category_views_service_1.CategoryViewsService,
            category_view_statistics_service_1.CategoryViewStatisticsService,
            file_extensions_service_1.FileExtensionsService,
            roles_service_1.RolesService,
            user_cart_items_service_1.UserCartItemsService,
            user_passwords_service_1.UserPasswordsService,
            book_files_service_1.BookFilesService,
            expired_tokens_service_1.ExpiredTokensService
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map