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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../../database/services/users/users.service");
const blocked_users_service_1 = require("../../../database/services/blocked-users/blocked-users.service");
const BlockedUser_1 = require("../../../database/entities/BlockedUser");
const roles_service_1 = require("../../../database/services/roles/roles.service");
const uuid_1 = require("uuid");
const fs = require("fs");
const books_service_1 = require("../../../database/services/books/books.service");
const authors_service_1 = require("../../../database/services/authors/authors.service");
const categories_service_1 = require("../../../database/services/categories/categories.service");
const Book_1 = require("../../../database/entities/Book");
const BookViewStatistic_1 = require("../../../database/entities/BookViewStatistic");
const book_view_statistics_service_1 = require("../../../database/services/book-view-statistics/book-view-statistics.service");
const book_rating_statistics_service_1 = require("../../../database/services/book-rating-statistics/book-rating-statistics.service");
const BookRatingStatistic_1 = require("../../../database/entities/BookRatingStatistic");
const process = require("process");
const book_files_service_1 = require("../../../database/services/book-files/book-files.service");
const user_cart_items_service_1 = require("../../../database/services/user-cart-items/user-cart-items.service");
const Author_1 = require("../../../database/entities/Author");
const author_view_statistics_service_1 = require("../../../database/services/author-view-statistics/author-view-statistics.service");
const AuthorViewStatistic_1 = require("../../../database/entities/AuthorViewStatistic");
const auth_service_1 = require("../../../auth/auth.service");
const sales_service_1 = require("../../../database/services/sales/sales.service");
const typeorm_1 = require("typeorm");
const utils_1 = require("../../../infrastructure/utils");
const mail_service_1 = require("../../../mail/mail.service");
const bcrypt = require("bcrypt");
const user_passwords_service_1 = require("../../../database/services/user-passwords/user-passwords.service");
let AdminPanelService = exports.AdminPanelService = class AdminPanelService {
    constructor(_usersService, _blockedUsersService, _rolesService, _booksService, _authorsService, _authorViewStatisticsService, _categoriesService, _bookViewStatisticsService, _bookRatingStatisticsService, _bookFilesService, _userCartItemsService, _authService, _salesService, _mailService, _userPasswordsService) {
        this._usersService = _usersService;
        this._blockedUsersService = _blockedUsersService;
        this._rolesService = _rolesService;
        this._booksService = _booksService;
        this._authorsService = _authorsService;
        this._authorViewStatisticsService = _authorViewStatisticsService;
        this._categoriesService = _categoriesService;
        this._bookViewStatisticsService = _bookViewStatisticsService;
        this._bookRatingStatisticsService = _bookRatingStatisticsService;
        this._bookFilesService = _bookFilesService;
        this._userCartItemsService = _userCartItemsService;
        this._authService = _authService;
        this._salesService = _salesService;
        this._mailService = _mailService;
        this._userPasswordsService = _userPasswordsService;
    }
    async createUser(userCreateDto) {
        const password = (0, utils_1.generateRandomPassword)();
        await this._authService.registration(Object.assign(Object.assign({}, userCreateDto), { password }));
        const user = await this._usersService.findOne({ email: userCreateDto.email });
        if (!user)
            return;
        user.image = userCreateDto.image;
        if (userCreateDto.isAdmin) {
            const adminKey = 'admin';
            user.roles.push(await this._rolesService.findOne({ name: adminKey }));
        }
        await this._usersService.save(user);
        this._mailService.sendRegistrationMessage({
            name: user.name,
            email: user.email,
        }, user.email, password).then();
    }
    async editUser(userEditDto) {
        const user = await this._usersService.findOne({ id: userEditDto.id }, true);
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        user.name = userEditDto.name;
        user.email = userEditDto.email;
        user.image = userEditDto.image;
        const adminKey = 'admin';
        const adminRole = await this._rolesService.findOne({ name: adminKey });
        const indexRole = user.roles.findIndex(r => r.name === adminRole.name);
        if (userEditDto.isAdmin && indexRole === -1) {
            user.roles.push(adminRole);
        }
        else if (!userEditDto.isAdmin && indexRole > -1) {
            user.roles.splice(indexRole, 1);
        }
        return this._usersService.save(user);
    }
    async resetPasswordUser(userId) {
        const user = await this._usersService.getUserWithPassword({ id: userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        const saltRounds = 10;
        const password = (0, utils_1.generateRandomPassword)();
        user.userPassword.password = await bcrypt.hash(password, saltRounds);
        await this._userPasswordsService.save(user.userPassword);
        this._mailService.sendResetPasswordMessage({ email: user.email, name: user.name }, password).then();
    }
    async blockUser(userId) {
        const isBlockedUser = (await this._blockedUsersService
            .findOne({ userId, unblockedAt: (0, typeorm_1.IsNull)() })) !== null;
        if (isBlockedUser)
            return;
        const user = await this._usersService.findOne({ id: userId });
        if (!user)
            throw new common_1.NotFoundException('User is not found');
        const blockedUser = new BlockedUser_1.BlockedUser(user, new Date(), null);
        return this._blockedUsersService.save(blockedUser);
    }
    async unblockUser(userId) {
        const blockedUser = await this._blockedUsersService
            .findOne({ userId, unblockedAt: (0, typeorm_1.IsNull)() });
        if (!blockedUser)
            return;
        blockedUser.unblockedAt = new Date();
        return this._blockedUsersService.save(blockedUser);
    }
    async addUserRole(userRole) {
        const user = await this._usersService.findOne({ id: userRole.userId }, true);
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        const role = await this._rolesService.findOne({ id: userRole.roleId });
        if (!role)
            throw new common_1.HttpException('Role is not found', 404);
        if (!user.roles.find(r => r.id === userRole.roleId)) {
            user.roles.push(role);
            await this._usersService.save(user);
        }
    }
    async removeUserRole(userRole) {
        const user = await this._usersService.findOne({ id: userRole.userId }, true);
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        const roleIndex = user.roles.findIndex(r => r.id === userRole.roleId);
        if (roleIndex === -1)
            throw new common_1.HttpException('Role is not found', 404);
        user.roles.splice(roleIndex, 1);
        await this._usersService.save(user);
    }
    async userRoles(userId) {
        const user = await this._usersService.findOne({ id: userId }, true);
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        return user.roles;
    }
    async getUserSales(userId) {
        const user = await this._usersService.findOne({ id: userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        return this._salesService.findAll({ userId: user.id });
    }
    async getUserBooksFromCart(userId) {
        const user = await this._usersService.findOne({ id: userId });
        if (!user)
            throw new common_1.HttpException('User is not found', 404);
        return (await this._userCartItemsService
            .findAll({ userId: user.id }))
            .map(c => c.book);
    }
    async uploadFile(file, path, fileName) {
        fileName = fileName.length > 0 ? fileName : (0, uuid_1.v4)();
        const fileStream = fs.createWriteStream(`${path}/${fileName}`);
        fileStream.write(file.buffer);
        fileStream.end();
        return fileName;
    }
    async createBook(bookCreateDto) {
        const book = new Book_1.Book();
        book.price = bookCreateDto.price;
        book.publicationYear = bookCreateDto.publicationYear;
        book.image = bookCreateDto.image;
        book.isbn = bookCreateDto.isbn;
        book.title = bookCreateDto.title;
        book.description = bookCreateDto.description;
        bookCreateDto.authorsId = [...new Set(bookCreateDto.authorsId)];
        bookCreateDto.categoriesId = [...new Set(bookCreateDto.categoriesId)];
        book.authors = await this._authorsService.findAll({ ids: bookCreateDto.authorsId }, true);
        book.categories = await this._categoriesService.findAll({ ids: bookCreateDto.categoriesId }, true);
        const result = await this._booksService.save(book);
        await this._bookViewStatisticsService.save(new BookViewStatistic_1.BookViewStatistic(book, 0));
        await this._bookRatingStatisticsService.save(new BookRatingStatistic_1.BookRatingStatistic(book, 0, 0));
        return result;
    }
    async editBook(bookEditDto) {
        const book = await this._booksService.findOne({ id: bookEditDto.id }, true);
        if (!book)
            throw new common_1.HttpException('Book is not found', 404);
        book.price = bookEditDto.price;
        book.publicationYear = bookEditDto.publicationYear;
        book.image = bookEditDto.image;
        book.isbn = bookEditDto.isbn;
        book.title = bookEditDto.title;
        book.description = bookEditDto.description;
        bookEditDto.authorsId = [...new Set(bookEditDto.authorsId)];
        bookEditDto.categoriesId = [...new Set(bookEditDto.categoriesId)];
        book.authors = await this._authorsService.findAll({ ids: bookEditDto.authorsId }, true);
        book.categories = await this._categoriesService.findAll({ ids: bookEditDto.categoriesId }, true);
        return this._booksService.save(book);
    }
    async deleteBookFile(id) {
        const item = await this._bookFilesService.findOne({ id }, true);
        if (!item)
            return new common_1.NotFoundException();
        await this._bookFilesService.delete(item);
        fs.unlinkSync(`${process.cwd()}/storage/files/books/${item.path}`);
    }
    async deleteBook(id) {
        const item = await this._booksService.findOneWithCartItems({ id });
        if (!item)
            return new common_1.NotFoundException();
        await this._userCartItemsService.deleteAll(item.userCartItems);
        await this._booksService.delete(item);
    }
    async restoreBook(id) {
        const item = await this._booksService.findOne({ id }, true);
        if (!item)
            return new common_1.NotFoundException();
        item.deletedAt = null;
        await this._booksService.save(item);
    }
    async createAuthor(authorCreateDto) {
        const author = new Author_1.Author();
        author.name = authorCreateDto.name;
        author.description = authorCreateDto.description;
        author.detailsLink = authorCreateDto.detailsLink;
        author.image = authorCreateDto.image;
        const result = await this._authorsService.save(author);
        await this._authorViewStatisticsService.save(new AuthorViewStatistic_1.AuthorViewStatistic(author, 0));
        return result;
    }
    async editAuthor(authorEditDto) {
        const author = await this._authorsService.findOne({ id: authorEditDto.id }, true);
        if (!author)
            throw new common_1.HttpException('Author is not found', 404);
        author.name = authorEditDto.name;
        author.description = authorEditDto.description;
        author.detailsLink = authorEditDto.detailsLink;
        author.image = authorEditDto.image;
        const result = await this._authorsService.save(author);
        return this._authorsService.save(author);
    }
    async deleteAuthor(id) {
        const item = await this._authorsService.findOne({ id });
        if (!item)
            return new common_1.NotFoundException();
        await this._authorsService.delete(item);
    }
    async restoreAuthor(id) {
        const item = await this._authorsService.findOne({ id }, true);
        if (!item)
            return new common_1.NotFoundException();
        item.deletedAt = null;
        await this._authorsService.save(item);
    }
};
exports.AdminPanelService = AdminPanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        blocked_users_service_1.BlockedUsersService,
        roles_service_1.RolesService,
        books_service_1.BooksService,
        authors_service_1.AuthorsService,
        author_view_statistics_service_1.AuthorViewStatisticsService,
        categories_service_1.CategoriesService,
        book_view_statistics_service_1.BookViewStatisticsService,
        book_rating_statistics_service_1.BookRatingStatisticsService,
        book_files_service_1.BookFilesService,
        user_cart_items_service_1.UserCartItemsService,
        auth_service_1.AuthService,
        sales_service_1.SalesService,
        mail_service_1.MailService,
        user_passwords_service_1.UserPasswordsService])
], AdminPanelService);
//# sourceMappingURL=admin-panel.service.js.map