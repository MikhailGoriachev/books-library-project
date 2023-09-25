import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../database/services/users/users.service';
import { UserCartItemsService } from '../../../database/services/user-cart-items/user-cart-items.service';
import { BooksService } from '../../../database/services/books/books.service';
import { BookRatingsService } from '../../../database/services/book-ratings/book-ratings.service';
import {
    BookRatingStatisticsService,
} from '../../../database/services/book-rating-statistics/book-rating-statistics.service';
import { BookViewsService } from '../../../database/services/book-views/book-views.service';
import {
    BookViewStatisticsService,
} from '../../../database/services/book-view-statistics/book-view-statistics.service';
import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import { AuthorsService } from '../../../database/services/authors/authors.service';
import { AuthorViewsService } from '../../../database/services/author-views/author-views.service';
import {
    AuthorViewStatisticsService,
} from '../../../database/services/author-view-statistics/author-view-statistics.service';
import { CategoriesService } from '../../../database/services/categories/categories.service';
import { CategoryViewsService } from '../../../database/services/category-views/category-views.service';
import {
    CategoryViewStatisticsService,
} from '../../../database/services/category-view-statistics/category-view-statistics.service';
import { SalesService } from '../../../database/services/sales/sales.service';
import { ApiConfigService } from '../../api-config/api-config.service';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BookView } from '../../../database/entities/BookView';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import { AuthorView } from '../../../database/entities/AuthorView';
import { AuthorViewStatistic } from '../../../database/entities/AuthorViewStatistic';
import { CategoryView } from '../../../database/entities/CategoryView';
import { CategoryViewStatistic } from '../../../database/entities/CategoryViewStatistic';

@Injectable()
export class GuestPanelService {
    constructor(private _usersService: UsersService,
                private _userCartItemsService: UserCartItemsService,
                private _booksService: BooksService,
                private _bookRatingsService: BookRatingsService,
                private _bookRatingStatisticsService: BookRatingStatisticsService,
                private _bookViewsService: BookViewsService,
                private _bookViewStatisticsService: BookViewStatisticsService,
                private _bookFilesService: BookFilesService,
                private _authorsService: AuthorsService,
                private _authorViewsService: AuthorViewsService,
                private _authorViewStatisticsService: AuthorViewStatisticsService,
                private _categoriesService: CategoriesService,
                private _categoryViewsService: CategoryViewsService,
                private _categoryViewStatisticsService: CategoryViewStatisticsService,
                private _apiConfigService: ApiConfigService,
                @InjectEntityManager()
                private _entityManager: EntityManager) {}

    // запись просмотра книги в статистику
    async setBookView(bookId: number) {
        const user = await this._usersService.findOne({ name: 'guest' });
        const book = await this._booksService.findOne({ id: bookId });

        if (!book)
            throw new Error('The book is not exists');

        // const queryRunner = this._entityManager.queryRunner;
        // await queryRunner.startTransaction();

        await this._entityManager.transaction(async entityManager => {
            await entityManager.save(new BookView(user, book, new Date()));

            const bookViewStatistic = await this._bookViewStatisticsService.findOne({ bookId: bookId });

            if (bookViewStatistic) {
                bookViewStatistic.amount++;
                await entityManager.save(bookViewStatistic);
            } else
                await entityManager.save(new BookViewStatistic(book, 1));
        });
    }

    // запись просмотра автора в статистику
    async setAuthorView(authorId: number) {
        const user = await this._usersService.findOne({ name: 'guest' });
        const author = await this._authorsService.findOne({ id: authorId });

        if (!author)
            throw new Error('The author is not exists');

        await this._entityManager.transaction(async entityManager => {
            await entityManager.save(new AuthorView(user, author, new Date()));

            const authorViewStatistic = await this._authorViewStatisticsService.findOne({ authorId: authorId });

            if (authorViewStatistic) {
                authorViewStatistic.amount++;
                await entityManager.save(authorViewStatistic);
            } else
                await entityManager.save(new AuthorViewStatistic(author, 1));
        });
    }

    // запись просмотра категории в статистику
    async setCategoryView(categoryId: number) {
        const user = await this._usersService.findOne({ name: 'guest' });
        const category = await this._categoriesService.findOne({ id: categoryId });

        if (!category)
            throw new Error('The category is not exists');

        await this._entityManager.transaction(async entityManager => {
            await entityManager.save(new CategoryView(user, category, new Date()));

            const categoryViewStatistic = await this._categoryViewStatisticsService.findOne(
                { categoryId: categoryId },
            );

            if (categoryViewStatistic) {
                categoryViewStatistic.amount++;
                await entityManager.save(categoryViewStatistic);
            } else
                await entityManager.save(new CategoryViewStatistic(category, 1));
        });
    }
}
