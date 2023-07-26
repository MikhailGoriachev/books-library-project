import { HttpException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { User } from '../../../database/entities/User';
import { UserCartItem } from '../../../database/entities/UserCartItem';
import { UsersService } from '../../../database/services/users/users.service';
import { UserCartItemsService } from '../../../database/services/user-cart-items/user-cart-items.service';
import { BooksService } from '../../../database/services/books/books.service';
import { Book } from '../../../database/entities/Book';
import { SetBookRatingDto } from '../../../dto/auth/set-book-rating.dto';
import { BookRatingsService } from '../../../database/services/book-ratings/book-ratings.service';
import { BookRating } from '../../../database/entities/BookRating';
import { BookViewsService } from '../../../database/services/book-views/book-views.service';
import { AuthorViewsService } from '../../../database/services/author-views/author-views.service';
import { CategoryViewsService } from '../../../database/services/category-views/category-views.service';
import { BookView } from '../../../database/entities/BookView';
import { AuthorsService } from '../../../database/services/authors/authors.service';
import { AuthorView } from '../../../database/entities/AuthorView';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import {
    BookViewStatisticsService,
} from '../../../database/services/book-view-statistics/book-view-statistics.service';
import {
    AuthorViewStatisticsService,
} from '../../../database/services/author-view-statistics/author-view-statistics.service';
import {
    CategoryViewStatisticsService,
} from '../../../database/services/category-view-statistics/category-view-statistics.service';
import { AuthorViewStatistic } from '../../../database/entities/AuthorViewStatistic';
import { CategoryView } from '../../../database/entities/CategoryView';
import { CategoryViewStatistic } from '../../../database/entities/CategoryViewStatistic';
import { CategoriesService } from '../../../database/services/categories/categories.service';
import {
    BookRatingStatisticsService,
} from '../../../database/services/book-rating-statistics/book-rating-statistics.service';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';
import { SalesService } from '../../../database/services/sales/sales.service';
import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import * as fs from 'fs';
import { join } from 'path';
import * as process from 'process';
import { ApiConfigService } from '../../api-config/api-config.service';

@Injectable()
export class UserPanelService {
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
                private _salesService: SalesService,
                private _apiConfigService: ApiConfigService,
                @InjectEntityManager()
                private _entityManager: EntityManager) {}

    // добавить книгу в корзину
    async addBookToCart(user: User, bookId: number): Promise<UserCartItem> {
        const isExists = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (isExists)
            throw new Error('The book exists in the cart');

        const book = await this._booksService.findOne({ id: bookId });

        if (!book)
            throw new NotFoundException('Book is not found');

        const cartItem = new UserCartItem(user, book);

        return this._userCartItemsService.save(cartItem);
    }

    // удалить книгу из корзины
    async removeBookFromCart(user: User, bookId: number): Promise<void> {
        const isExists = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (!isExists)
            throw new Error('The book is not exists in the cart');

        await this._userCartItemsService.remove(isExists.id);
    }

    // очистка корзины пользователя
    async clearCart(user: User) {
        const cartItems = await this._userCartItemsService.findAll({ userId: user.id });
        await this._userCartItemsService.removeAll(cartItems);
    }

    // получить список книг в корзине
    async getBooksFromCart(user: User): Promise<Book[]> {
        return (await this._userCartItemsService.findAll({ userId: user.id })).map(c => c.book);
    }

    // установить оценку книги
    async setBookRating(user: User, rating: SetBookRatingDto) {
        const item = await this._bookRatingsService.findOne({
            userId: user.id, bookId: rating.bookId,
        });

        const book = await this._booksService.findOne({ id: rating.bookId });

        if (!book)
            throw new Error('The book is not exists');

        const queryRunner = this._entityManager.queryRunner;
        await queryRunner.startTransaction();

        try {
            if (!item) {
                await this._entityManager.save(new BookRating(user, book, rating.value));
            } else {
                item.value = rating.value;
                await this._entityManager.save(item);
            }

            const bookRatingStatistic = await this._bookRatingStatisticsService.findOne(
                { bookId: rating.bookId },
            );

            if (bookRatingStatistic) {

                if (item) {
                    bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - item.value)
                        / bookRatingStatistic.amount;

                    await this._entityManager.save(bookRatingStatistic);
                } else {
                    bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - item.value)
                        / bookRatingStatistic.amount + 1;

                    bookRatingStatistic.amount++;

                    await this._entityManager.save(bookRatingStatistic);
                }

                await this._entityManager.save(bookRatingStatistic);
            } else
                await this._entityManager.save(new BookRatingStatistic(book, rating.value, 1));

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // снять оценку с книги
    async removeBookRating(user: User, bookId: number): Promise<BookRating | void> {
        const item = await this._bookRatingsService.findOne({
            userId: user.id, bookId,
        });

        if (!item)
            return;

        await this._bookRatingsService.delete(item);
    }

    // запись просмотра книги в статистику
    async setBookView(user: User, bookId: number) {
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
    async setAuthorView(user: User, authorId: number) {
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
    async setCategoryView(user: User, categoryId: number) {
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

    // скачать купленную книгу
    async downloadBook(user: User, bookFileId: number) {
        const bookFile = await this._bookFilesService.findOne({ id: bookFileId });

        if (!bookFile)
            throw new HttpException('Book file is not exists', 404);

        // поиск книги в покупках пользователя
        // const sale = await this._salesService.findOne({ userId: user.id, bookId: bookFile.book.id });
        //
        // if (!sale)
        //     throw new HttpException('Sale is not exists', 404);

        // const file = fs.createReadStream(join(this._apiConfigService.storageBookFilesPath, 'kali.png'));
        const file = fs.createReadStream(join(this._apiConfigService.storageBookFilesPath, bookFile.path));

        return new StreamableFile(file, { disposition: `filename="${bookFile.path + '.' + bookFile.fileExtension.name}"` });
        // return new StreamableFile(file);
    }
}
