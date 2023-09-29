import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { BooksService } from './services/books/books.service';
import { SalesService } from './services/sales/sales.service';
import { AuthorViewsService } from './services/author-views/author-views.service';
import { BlockedUsersService } from './services/blocked-users/blocked-users.service';
import { BookRatingsService } from './services/book-ratings/book-ratings.service';
import { BookViewsService } from './services/book-views/book-views.service';
import { CategoriesService } from './services/categories/categories.service';
import { FileExtensionsService } from './services/file-extensions/file-extensions.service';
import { RolesService } from './services/roles/roles.service';
import { UserCartItemsService } from './services/user-cart-items/user-cart-items.service';
import { UserPasswordsService } from './services/user-passwords/user-passwords.service';
import { BookFilesService } from './services/book-files/book-files.service';
import { CategoryViewsService } from './services/category-views/category-views.service';
import { AuthorsService } from './services/authors/authors.service';
import { ExpiredTokensService } from './services/expired-tokens/expired-tokens.service';
import { AuthorViewStatisticsService } from './services/author-view-statistics/author-view-statistics.service';
import { BookRatingStatisticsService } from './services/book-rating-statistics/book-rating-statistics.service';
import { BookViewStatisticsService } from './services/book-view-statistics/book-view-statistics.service';
import { CategoryViewStatisticsService } from './services/category-view-statistics/category-view-statistics.service';
import { EntitySchema } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature(AppDataSource.options.entities as EntitySchema[]),
    ],
    exports: [
        UsersService,
        AuthorsService,
        BooksService,
        SalesService,
        AuthorViewsService,
        AuthorViewStatisticsService,
        BlockedUsersService,
        BookRatingsService,
        BookRatingStatisticsService,
        BookViewsService,
        BookViewStatisticsService,
        CategoriesService,
        CategoryViewsService,
        CategoryViewStatisticsService,
        FileExtensionsService,
        RolesService,
        UserCartItemsService,
        UserPasswordsService,
        BookFilesService,
        ExpiredTokensService,
    ],
    providers: [
        UsersService,
        AuthorsService,
        BooksService,
        SalesService,
        AuthorViewsService,
        AuthorViewStatisticsService,
        BlockedUsersService,
        BookRatingsService,
        BookRatingStatisticsService,
        BookViewsService,
        BookViewStatisticsService,
        CategoriesService,
        CategoryViewsService,
        CategoryViewStatisticsService,
        FileExtensionsService,
        RolesService,
        UserCartItemsService,
        UserPasswordsService,
        BookFilesService,
        ExpiredTokensService
    ],
})
export class DatabaseModule {}
