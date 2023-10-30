import {
    Body,
    HttpException,
    Injectable,
    NotFoundException,
    Post,
    StreamableFile,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
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
import { Sale } from '../../../database/entities/Sale';
import { transliterate as tr, slugify } from 'transliteration';
import * as console from 'console';
import { UserEditProfileDto } from '../../../dto/user-panel/user-edit-profile.dto';
import { UserPasswordEditDto } from '../../../dto/user-panel/user-password-edit.dto';
import * as bcrypt from 'bcrypt';
import { UserPasswordsService } from '../../../database/services/user-passwords/user-passwords.service';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UserPanelService {
    constructor(private readonly _usersService: UsersService,
                private readonly _userCartItemsService: UserCartItemsService,
                private readonly _booksService: BooksService,
                private readonly _bookRatingsService: BookRatingsService,
                private readonly _bookRatingStatisticsService: BookRatingStatisticsService,
                private readonly _bookViewsService: BookViewsService,
                private readonly _bookViewStatisticsService: BookViewStatisticsService,
                private readonly _bookFilesService: BookFilesService,
                private readonly _authorsService: AuthorsService,
                private readonly _authorViewsService: AuthorViewsService,
                private readonly _authorViewStatisticsService: AuthorViewStatisticsService,
                private readonly _categoriesService: CategoriesService,
                private readonly _categoryViewsService: CategoryViewsService,
                private readonly _categoryViewStatisticsService: CategoryViewStatisticsService,
                private readonly _salesService: SalesService,
                private readonly _apiConfigService: ApiConfigService,
                private readonly _userPasswordsService: UserPasswordsService,
                @InjectEntityManager()
                private readonly _entityManager: EntityManager) {}

    // добавить книгу в корзину
    async addBookToCart(user: User, bookId: number): Promise<UserCartItem> {
        const isExistsCart = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (isExistsCart)
            throw new HttpException('The book exists in the cart', 400);

        const isExistsSales = await this._salesService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (isExistsSales)
            throw new HttpException('The book has already been purchased', 400);

        const book = await this._booksService.findOne({ id: bookId });

        if (!book)
            throw new NotFoundException('Book is not found');

        const cartItem = new UserCartItem(user, book);

        return this._userCartItemsService.save(cartItem);
    }

    // добавить коллекцию книг в корзину
    async addBookListToCart(user: User, bookIds: number[]): Promise<UserCartItem[]> {
        const cart = await this._userCartItemsService.findAll({
            userId: user.id
        });
        
        const sales = await this._salesService.findAll({
            userId: user.id
        });
        
        bookIds = bookIds.filter(b => 
            !(cart.find(c => c.book.id === b) || sales.find(s => s.book.id === b))
        );
        
        const books = await this._booksService.findAll({ ids: bookIds });
        
        const items = books.map(b => new UserCartItem(user, b))    
        
        return this._userCartItemsService.saveAll(items);
    }

    // удалить книгу из корзины
    async removeBookFromCart(user: User, bookId: number): Promise<void> {
        const isExists = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (!isExists)
            throw new Error('The book is not exists in the cart');


        const isExistsSales = await this._salesService.findOne({
            userId: user.id,
            bookId: bookId,
        });

        if (isExistsSales)
            throw new Error('The book has already been purchased');

        await this._userCartItemsService.delete(isExists.id);
    }

    // очистка корзины пользователя
    async clearCart(user: User) {
        const cartItems = await this._userCartItemsService.findAll({ userId: user.id });
        await this._userCartItemsService.deleteAll(cartItems);
    }

    // получить список книг в корзине
    async getBooksFromCart(user: User): Promise<Book[]> {
        return (await this._userCartItemsService.findAll({ userId: user.id })).map(c => c.book);
    }

    // установить оценку книги
    async setBookRating(user: User, rating: SetBookRatingDto): Promise<BookRating> {
        let bookRating = await this._bookRatingsService.findOne({
            userId: user.id, bookId: rating.bookId,
        });

        const book = await this._booksService.findOne({ id: rating.bookId });

        if (!book)
            throw new Error('The book is not exists');

        await this._entityManager.transaction(async entityManager => {

            const isExistsBookRating = !!bookRating;
            let oldValue = bookRating?.value;

            if (!isExistsBookRating) {
                bookRating = await this._entityManager.save(new BookRating(user, book, rating.value));
            } else {
                bookRating.value = rating.value;
                await this._entityManager.save(bookRating);
            }

            const bookRatingStatistic = await this._bookRatingStatisticsService.findOne(
                { bookId: rating.bookId },
            );

            if (bookRatingStatistic) {

                if (isExistsBookRating) {
                    bookRatingStatistic.value = (((bookRatingStatistic.value * bookRatingStatistic.amount) - oldValue) + bookRating.value)
                        / bookRatingStatistic.amount;

                    await this._entityManager.save(bookRatingStatistic);
                } else {
                    bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) + bookRating.value)
                        / (bookRatingStatistic.amount + 1);

                    bookRatingStatistic.amount++;

                    await this._entityManager.save(bookRatingStatistic);
                }

                await this._entityManager.save(bookRatingStatistic);
            } else
                await this._entityManager.save(new BookRatingStatistic(book, rating.value, 1));

        });

        return bookRating;

        // const queryRunner = this._entityManager.queryRunner;
        // await queryRunner.startTransaction();
        //
        // try {
        //     if (!item) {
        //         await this._entityManager.save(new BookRating(user, book, rating.value));
        //     } else {
        //         item.value = rating.value;
        //         await this._entityManager.save(item);
        //     }
        //
        //     const bookRatingStatistic = await this._bookRatingStatisticsService.findOne(
        //         { bookId: rating.bookId },
        //     );
        //
        //     if (bookRatingStatistic) {
        //
        //         if (item) {
        //             bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) -
        // item.value) / bookRatingStatistic.amount;  await this._entityManager.save(bookRatingStatistic); } else {
        // bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - item.value) /
        // bookRatingStatistic.amount + 1;  bookRatingStatistic.amount++;  await
        // this._entityManager.save(bookRatingStatistic); }  await this._entityManager.save(bookRatingStatistic); }
        // else await this._entityManager.save(new BookRatingStatistic(book, rating.value, 1));  await
        // queryRunner.commitTransaction(); } catch (err) { await queryRunner.rollbackTransaction(); throw err; }
        // finally { await queryRunner.release(); }
    }

    // снять оценку с книги
    async removeBookRating(user: User, bookId: number): Promise<BookRating | void> {
        const bookRating = await this._bookRatingsService.findOne({
            userId: user.id, bookId,
        });

        if (!bookRating)
            return;

        await this._entityManager.transaction(async entityManager => {

            const bookRatingStatistic = await this._bookRatingStatisticsService.findOne(
                { bookId },
            );

            if (bookRatingStatistic) {

                bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - bookRating.value)
                    / (bookRatingStatistic.amount - 1);

                bookRatingStatistic.amount--;

                await this._entityManager.save(bookRatingStatistic);

                await this._entityManager.delete(BookRating, { id: bookRating.id });
            } else
                return;
        });
    }

    // получить оценку книги
    async getBookRating(user: User, bookId: number): Promise<BookRating | void> {
        return await this._bookRatingsService.findOne({
            userId: user.id, bookId,
        });
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
        const bookFile = await this._bookFilesService.findOne({ id: bookFileId }, true);

        if (!bookFile)
            throw new HttpException('Book file is not exists', 404);

        if (!user.roles.find(r => r.name === 'admin')) {
            // поиск книги в покупках пользователя
            const sale = await this._salesService.findOne({ userId: user.id, bookId: bookFile.book.id });

            if (!sale)
                throw new HttpException('Sale is not exists', 404);
        }
        // const file = fs.createReadStream(join(this._apiConfigService.storageBookFilesPath, 'kali.png'));
        const file = fs.createReadStream(
            join(this._apiConfigService.storageBookFilesPath, bookFile.path),
            // join(this._apiConfigService.storageBookFilesPath, 'kali.png'),
        );

        const fileName = `${tr(bookFile.book.title)}.${bookFile.fileExtension.name}`
            .replace(/ /g, '_')
            .toLowerCase();
        return new StreamableFile(file,
            { disposition: `filename="${fileName}"` });
        // return new StreamableFile(file);
    }

    // получить список покупок
    getSales(user: User) {
        return this._salesService.findAll({ userId: user.id });
    }

    // купить книги
    async buy(user: User) {
        const items = await this._userCartItemsService.findAll({ userId: user.id });

        const saleDate = new Date();
        const sales = items.map(c => new Sale(user, c.book, c.book.price, saleDate));

        const result = await this._salesService.saveAll(sales);

        await this.clearCart(user);

        return result;
    }

    // изменить данные профиля
    async profileEdit(user: User, userEditProfileDto: UserEditProfileDto) {
        user.name = userEditProfileDto.name;
        user.image = userEditProfileDto.image;

        return this._usersService.save(user);
    }

    // изменить пароль
    async passwordEdit(user: User, userPasswordEditDto: UserPasswordEditDto) {
        user = await this._usersService.getUserWithPassword({ id: user.id });

        if (await bcrypt.compare(userPasswordEditDto.password, user.userPassword.password)) {
            const saltRounds = 10;
            user.userPassword.password = await bcrypt.hash(userPasswordEditDto.newPassword, saltRounds);

            await this._userPasswordsService.save(user.userPassword);
            return { result: true };
        }

        return { result: false };
    }


    async uploadUserImageFile(user: User, file: Express.Multer.File) {
        user.image = user.image.startsWith('default')
            ? uuidv4()
            : user.image;


        const path = `${process.cwd()}/public/images/users/${user.image}`;

        const fileStream = fs.createWriteStream(path);

        fileStream.write(file.buffer);

        fileStream.end();

        return user.image;
    }
}
