"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPanelService = void 0;
const common_1 = require("@nestjs/common");
const UserCartItem_1 = require("../../../database/entities/UserCartItem");
const users_service_1 = require("../../../database/services/users/users.service");
const user_cart_items_service_1 = require("../../../database/services/user-cart-items/user-cart-items.service");
const books_service_1 = require("../../../database/services/books/books.service");
const book_ratings_service_1 = require("../../../database/services/book-ratings/book-ratings.service");
const BookRating_1 = require("../../../database/entities/BookRating");
const book_views_service_1 = require("../../../database/services/book-views/book-views.service");
const author_views_service_1 = require("../../../database/services/author-views/author-views.service");
const category_views_service_1 = require("../../../database/services/category-views/category-views.service");
const BookView_1 = require("../../../database/entities/BookView");
const authors_service_1 = require("../../../database/services/authors/authors.service");
const AuthorView_1 = require("../../../database/entities/AuthorView");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const BookViewStatistic_1 = require("../../../database/entities/BookViewStatistic");
const book_view_statistics_service_1 = require("../../../database/services/book-view-statistics/book-view-statistics.service");
const author_view_statistics_service_1 = require("../../../database/services/author-view-statistics/author-view-statistics.service");
const category_view_statistics_service_1 = require("../../../database/services/category-view-statistics/category-view-statistics.service");
const AuthorViewStatistic_1 = require("../../../database/entities/AuthorViewStatistic");
const CategoryView_1 = require("../../../database/entities/CategoryView");
const CategoryViewStatistic_1 = require("../../../database/entities/CategoryViewStatistic");
const categories_service_1 = require("../../../database/services/categories/categories.service");
const book_rating_statistics_service_1 = require("../../../database/services/book-rating-statistics/book-rating-statistics.service");
const BookRatingStatistic_1 = require("../../../database/entities/BookRatingStatistic");
const sales_service_1 = require("../../../database/services/sales/sales.service");
const book_files_service_1 = require("../../../database/services/book-files/book-files.service");
const fs = require("fs");
const path_1 = require("path");
const api_config_service_1 = require("../../api-config/api-config.service");
let UserPanelService = exports.UserPanelService = class UserPanelService {
    constructor(_usersService, _userCartItemsService, _booksService, _bookRatingsService, _bookRatingStatisticsService, _bookViewsService, _bookViewStatisticsService, _bookFilesService, _authorsService, _authorViewsService, _authorViewStatisticsService, _categoriesService, _categoryViewsService, _categoryViewStatisticsService, _salesService, _apiConfigService, _entityManager) {
        this._usersService = _usersService;
        this._userCartItemsService = _userCartItemsService;
        this._booksService = _booksService;
        this._bookRatingsService = _bookRatingsService;
        this._bookRatingStatisticsService = _bookRatingStatisticsService;
        this._bookViewsService = _bookViewsService;
        this._bookViewStatisticsService = _bookViewStatisticsService;
        this._bookFilesService = _bookFilesService;
        this._authorsService = _authorsService;
        this._authorViewsService = _authorViewsService;
        this._authorViewStatisticsService = _authorViewStatisticsService;
        this._categoriesService = _categoriesService;
        this._categoryViewsService = _categoryViewsService;
        this._categoryViewStatisticsService = _categoryViewStatisticsService;
        this._salesService = _salesService;
        this._apiConfigService = _apiConfigService;
        this._entityManager = _entityManager;
    }
    async addBookToCart(user, bookId) {
        const isExists = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });
        if (isExists)
            throw new Error('The book exists in the cart');
        const book = await this._booksService.findOne({ id: bookId });
        if (!book)
            throw new common_1.NotFoundException('Book is not found');
        const cartItem = new UserCartItem_1.UserCartItem(user, book);
        return this._userCartItemsService.save(cartItem);
    }
    async removeBookFromCart(user, bookId) {
        const isExists = await this._userCartItemsService.findOne({
            userId: user.id,
            bookId: bookId,
        });
        if (!isExists)
            throw new Error('The book is not exists in the cart');
        await this._userCartItemsService.remove(isExists.id);
    }
    async clearCart(user) {
        const cartItems = await this._userCartItemsService.findAll({ userId: user.id });
        await this._userCartItemsService.removeAll(cartItems);
    }
    async getBooksFromCart(user) {
        return (await this._userCartItemsService.findAll({ userId: user.id })).map(c => c.book);
    }
    async setBookRating(user, rating) {
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
                await this._entityManager.save(new BookRating_1.BookRating(user, book, rating.value));
            }
            else {
                item.value = rating.value;
                await this._entityManager.save(item);
            }
            const bookRatingStatistic = await this._bookRatingStatisticsService.findOne({ bookId: rating.bookId });
            if (bookRatingStatistic) {
                if (item) {
                    bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - item.value)
                        / bookRatingStatistic.amount;
                    await this._entityManager.save(bookRatingStatistic);
                }
                else {
                    bookRatingStatistic.value = ((bookRatingStatistic.value * bookRatingStatistic.amount) - item.value)
                        / bookRatingStatistic.amount + 1;
                    bookRatingStatistic.amount++;
                    await this._entityManager.save(bookRatingStatistic);
                }
                await this._entityManager.save(bookRatingStatistic);
            }
            else
                await this._entityManager.save(new BookRatingStatistic_1.BookRatingStatistic(book, rating.value, 1));
            await queryRunner.commitTransaction();
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async removeBookRating(user, bookId) {
        const item = await this._bookRatingsService.findOne({
            userId: user.id, bookId,
        });
        if (!item)
            return;
        await this._bookRatingsService.delete(item);
    }
    async setBookView(user, bookId) {
        const book = await this._booksService.findOne({ id: bookId });
        if (!book)
            throw new Error('The book is not exists');
        await this._entityManager.transaction(async (entityManager) => {
            await entityManager.save(new BookView_1.BookView(user, book, new Date()));
            const bookViewStatistic = await this._bookViewStatisticsService.findOne({ bookId: bookId });
            if (bookViewStatistic) {
                bookViewStatistic.amount++;
                await entityManager.save(bookViewStatistic);
            }
            else
                await entityManager.save(new BookViewStatistic_1.BookViewStatistic(book, 1));
        });
    }
    async setAuthorView(user, authorId) {
        const author = await this._authorsService.findOne({ id: authorId });
        if (!author)
            throw new Error('The author is not exists');
        await this._entityManager.transaction(async (entityManager) => {
            await entityManager.save(new AuthorView_1.AuthorView(user, author, new Date()));
            const authorViewStatistic = await this._authorViewStatisticsService.findOne({ authorId: authorId });
            if (authorViewStatistic) {
                authorViewStatistic.amount++;
                await entityManager.save(authorViewStatistic);
            }
            else
                await entityManager.save(new AuthorViewStatistic_1.AuthorViewStatistic(author, 1));
        });
    }
    async setCategoryView(user, categoryId) {
        const category = await this._categoriesService.findOne({ id: categoryId });
        if (!category)
            throw new Error('The category is not exists');
        await this._entityManager.transaction(async (entityManager) => {
            await entityManager.save(new CategoryView_1.CategoryView(user, category, new Date()));
            const categoryViewStatistic = await this._categoryViewStatisticsService.findOne({ categoryId: categoryId });
            if (categoryViewStatistic) {
                categoryViewStatistic.amount++;
                await entityManager.save(categoryViewStatistic);
            }
            else
                await entityManager.save(new CategoryViewStatistic_1.CategoryViewStatistic(category, 1));
        });
    }
    async downloadBook(user, bookFileId) {
        const bookFile = await this._bookFilesService.findOne({ id: bookFileId });
        if (!bookFile)
            throw new common_1.HttpException('Book file is not exists', 404);
        const file = fs.createReadStream((0, path_1.join)(this._apiConfigService.storageBookFilesPath, bookFile.path));
        return new common_1.StreamableFile(file, { disposition: `filename="${bookFile.path + '.' + bookFile.fileExtension.name}"` });
    }
};
exports.UserPanelService = UserPanelService = __decorate([
    (0, common_1.Injectable)(),
    __param(16, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        user_cart_items_service_1.UserCartItemsService,
        books_service_1.BooksService,
        book_ratings_service_1.BookRatingsService,
        book_rating_statistics_service_1.BookRatingStatisticsService,
        book_views_service_1.BookViewsService,
        book_view_statistics_service_1.BookViewStatisticsService,
        book_files_service_1.BookFilesService,
        authors_service_1.AuthorsService,
        author_views_service_1.AuthorViewsService,
        author_view_statistics_service_1.AuthorViewStatisticsService,
        categories_service_1.CategoriesService,
        category_views_service_1.CategoryViewsService,
        category_view_statistics_service_1.CategoryViewStatisticsService,
        sales_service_1.SalesService,
        api_config_service_1.ApiConfigService,
        typeorm_2.EntityManager])
], UserPanelService);
//# sourceMappingURL=user-panel.service.js.map