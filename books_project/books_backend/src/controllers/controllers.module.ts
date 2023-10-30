import { Module } from '@nestjs/common';
import { UsersController } from './crud/users/users.controller';
import { BooksController } from './crud/books/books.controller';
import { AuthorsController } from './crud/authors/authors.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthorViewsController } from './crud/author-views/author-views.controller';
import { BlockedUsersController } from './crud/blocked-users/blocked-users.controller';
import { BookFilesController } from './crud/book-files/book-files.controller';
import { BookRatingsController } from './crud/book-ratings/book-ratings.controller';
import { BookViewsController } from './crud/book-views/book-views.controller';
import { CategoriesController } from './crud/categories/categories.controller';
import { CategoryViewsController } from './crud/category-views/category-views.controller';
import { FileExtensionsController } from './crud/file-extensions/file-extensions.controller';
import { RolesController } from './crud/roles/roles.controller';
import { SalesController } from './crud/sales/sales.controller';
import { UserCartItemsController } from './crud/user-cart-items/user-cart-items.controller';
import { UserPasswordsController } from './crud/user-passwords/user-passwords.controller';
import { UserPanelController } from './panels/user-panel/user-panel.controller';
import { AdminPanelController } from './panels/admin-panel/admin-panel.controller';
import { AuthorViewStatisticsController } from './crud/author-view-statistics/author-view-statistics.controller';
import { BookRatingStatisticsController } from './crud/book-rating-statistics/book-rating-statistics.controller';
import { CategoryViewStatisticsController } from './crud/category-view-statistics/category-view-statistics.controller';
import { BookViewStatisticsController } from './crud/book-view-statistics/book-view-statistics.controller';
import { ServicesModule } from '../services/services.module';
import { GuestPanelController } from './panels/guest-panel/guest-panel.controller';
import { BooksReportsController } from './reports/books-reports/books-reports.controller';
import { AuthorsReportsController } from './reports/authors-reports/authors-reports.controller';
import { UsersReportsController } from './reports/users-reports/users-reports.controller';
import { CategoriesReportsController } from './reports/categories-reports/categories-reports.controller';

@Module({
    controllers: [
        UsersController,
        BooksController,
        AuthorsController,
        AuthorViewsController,
        AuthorViewStatisticsController,
        BlockedUsersController,
        BookFilesController,
        BookRatingsController,
        BookRatingStatisticsController,
        BookViewsController,
        BookViewStatisticsController,
        CategoriesController,
        CategoryViewsController,
        CategoryViewStatisticsController,
        FileExtensionsController,
        RolesController,
        SalesController,
        UserCartItemsController,
        UserPasswordsController,
        UserPanelController,
        AdminPanelController,
        GuestPanelController,
        BooksReportsController,
        AuthorsReportsController,
        UsersReportsController,
        CategoriesReportsController,
    ],
    imports: [DatabaseModule, ServicesModule],
    exports: [DatabaseModule]
})
export class ControllersModule {}
