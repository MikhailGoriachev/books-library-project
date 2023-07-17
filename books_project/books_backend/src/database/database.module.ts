import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { appDataSourceOptions } from './data-source';
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
import { ExpiredToken } from './entities/ExpiredToken';
import { AuthorViewStatisticsService } from './services/author-view-statistics/author-view-statistics.service';
import { BookRatingStatisticsService } from './services/book-rating-statistics/book-rating-statistics.service';
import { BookViewStatisticsService } from './services/book-view-statistics/book-view-statistics.service';
import { CategoryViewStatisticsService } from './services/category-view-statistics/category-view-statistics.service';
import { BookRatingStatistic } from './entities/BookRatingStatistic';
import { BookViewStatistic } from './entities/BookViewStatistic';
import { AuthorViewStatistic } from './entities/AuthorViewStatistic';
import { CategoryViewStatistic } from './entities/CategoryViewStatistic';

@Module({
    imports: [
        TypeOrmModule.forRoot(appDataSourceOptions),
        TypeOrmModule.forFeature([
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
            ExpiredToken
        ]),
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
        ExpiredTokensService],
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
        ExpiredTokensService],
})
export class DatabaseModule {}
