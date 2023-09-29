import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../../database/services/users/users.service';
import { BlockedUsersService } from '../../../database/services/blocked-users/blocked-users.service';
import { BlockedUser } from '../../../database/entities/BlockedUser';
import { UserRoleDto } from '../../../dto/user-role.dto';
import { RolesService } from '../../../database/services/roles/roles.service';
import { Role } from '../../../database/entities/Role';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { BookEditDto } from '../../../dto/admin-panel/book/book-edit.dto';
import { BooksService } from '../../../database/services/books/books.service';
import { AuthorsService } from '../../../database/services/authors/authors.service';
import { CategoriesService } from '../../../database/services/categories/categories.service';
import { Book } from '../../../database/entities/Book';
import { BookCreateDto } from '../../../dto/admin-panel/book/book-create.dto';
import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import {
    BookViewStatisticsService,
} from '../../../database/services/book-view-statistics/book-view-statistics.service';
import {
    BookRatingStatisticsService,
} from '../../../database/services/book-rating-statistics/book-rating-statistics.service';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';
import * as process from 'process';
import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import { UserCartItemsService } from '../../../database/services/user-cart-items/user-cart-items.service';
import { lastValueFrom } from 'rxjs';
import { Author } from '../../../database/entities/Author';
import { AuthorCreateDto } from '../../../dto/admin-panel/author/author-create.dto';
import {
    AuthorViewStatisticsService,
} from '../../../database/services/author-view-statistics/author-view-statistics.service';
import { AuthorViewStatistic } from '../../../database/entities/AuthorViewStatistic';
import { AuthorEditDto } from '../../../dto/admin-panel/author/author-edit.dto';
import { UserCreateDto } from '../../../dto/admin-panel/user/user-create.dto';
import { User } from '../../../database/entities/User';
import { UserEditDto } from '../../../dto/admin-panel/user/user-edit.dto';
import { AuthService } from '../../../auth/auth.service';
import { SalesService } from '../../../database/services/sales/sales.service';
import { IsNull } from 'typeorm';
import { generateRandomPassword } from '../../../infrastructure/utils';
import { MailService } from '../../../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { UserPasswordsService } from '../../../database/services/user-passwords/user-passwords.service';

@Injectable()
export class AdminPanelService {
    constructor(private readonly _usersService: UsersService,
                private readonly _blockedUsersService: BlockedUsersService,
                private readonly _rolesService: RolesService,
                private readonly _booksService: BooksService,
                private readonly _authorsService: AuthorsService,
                private readonly _authorViewStatisticsService: AuthorViewStatisticsService,
                private readonly _categoriesService: CategoriesService,
                private readonly _bookViewStatisticsService: BookViewStatisticsService,
                private readonly _bookRatingStatisticsService: BookRatingStatisticsService,
                private readonly _bookFilesService: BookFilesService,
                private readonly _userCartItemsService: UserCartItemsService,
                private readonly _authService: AuthService,
                private readonly _salesService: SalesService,
                private readonly _mailService: MailService,
                private readonly _userPasswordsService: UserPasswordsService,
    ) {}

    // добавить пользователя
    async createUser(userCreateDto: UserCreateDto) {
        const password = generateRandomPassword();

        await this._authService.registration({
            ...userCreateDto,
            password,
        });

        const user = await this._usersService.findOne({ email: userCreateDto.email });

        if (!user)
            return;

        user.image = userCreateDto.image;

        if (userCreateDto.isAdmin) {
            const adminKey = 'admin';
            user.roles.push(await this._rolesService.findOne({ name: adminKey }));
        }

        await this._usersService.save(user);

        this._mailService.sendRegistrationMessage(
            {
                name: user.name,
                email: user.email,
            },
            user.email,
            password,
        ).then();
    }

    // изменить пользователя
    async editUser(userEditDto: UserEditDto) {
        const user = await this._usersService.findOne({ id: userEditDto.id }, true);

        if (!user)
            throw new HttpException('User is not found', 404);

        user.name = userEditDto.name;
        user.email = userEditDto.email;
        user.image = userEditDto.image;

        const adminKey = 'admin';
        const adminRole = await this._rolesService.findOne({ name: adminKey });

        const indexRole = user.roles.findIndex(r => r.name === adminRole.name);

        if (userEditDto.isAdmin && indexRole === -1) {
            user.roles.push(adminRole);
        } else if (!userEditDto.isAdmin && indexRole > -1) {
            user.roles.splice(indexRole, 1);
        }

        return this._usersService.save(user);
    }

    // сбросить пароль пользователя
    async resetPasswordUser(userId: number) {
        const user = await this._usersService.getUserWithPassword({ id: userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        const saltRounds = 10;

        const password = generateRandomPassword();
        user.userPassword.password = await bcrypt.hash(password, saltRounds);

        await this._userPasswordsService.save(user.userPassword);

        this._mailService.sendResetPasswordMessage(
            { email: user.email, name: user.name }, password,
        ).then();
    }

    // заблокировать пользователя
    async blockUser(userId: number): Promise<BlockedUser> {
        const isBlockedUser = (await this._blockedUsersService
            .findOne({ userId, unblockedAt: IsNull() })) !== null;

        if (isBlockedUser)
            return;

        const user = await this._usersService.findOne({ id: userId });

        if (!user)
            throw new NotFoundException('User is not found');

        const blockedUser = new BlockedUser(user, new Date(), null);

        return this._blockedUsersService.save(blockedUser);
    }

    // разблокировать пользователя
    async unblockUser(userId: number): Promise<BlockedUser> {
        const blockedUser = await this._blockedUsersService
            .findOne({ userId, unblockedAt: IsNull() });

        if (!blockedUser)
            return;

        blockedUser.unblockedAt = new Date();

        return this._blockedUsersService.save(blockedUser);
    }

    // назначить роль пользователя
    async addUserRole(userRole: UserRoleDto) {
        const user = await this._usersService.findOne({ id: userRole.userId }, true);

        if (!user)
            throw new HttpException('User is not found', 404);

        const role = await this._rolesService.findOne({ id: userRole.roleId });

        if (!role)
            throw new HttpException('Role is not found', 404);

        if (!user.roles.find(r => r.id === userRole.roleId)) {
            user.roles.push(role);
            await this._usersService.save(user);
        }
    }

    // убрать роль пользователя
    async removeUserRole(userRole: UserRoleDto) {
        const user = await this._usersService.findOne({ id: userRole.userId }, true);

        if (!user)
            throw new HttpException('User is not found', 404);

        const roleIndex = user.roles.findIndex(r => r.id === userRole.roleId);

        if (roleIndex === -1)
            throw new HttpException('Role is not found', 404);

        user.roles.splice(roleIndex, 1);

        await this._usersService.save(user);
    }

    // получить роли пользователя
    async userRoles(userId: number): Promise<Role[]> {
        const user = await this._usersService.findOne({ id: userId }, true);

        if (!user)
            throw new HttpException('User is not found', 404);

        return user.roles;
    }

    // получить список покупок
    async getUserSales(userId: number) {
        const user = await this._usersService.findOne({ id: userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        return this._salesService.findAll({ userId: user.id });
    }

    // получить список книг в корзине
    async getUserBooksFromCart(userId: number): Promise<Book[]> {
        const user = await this._usersService.findOne({ id: userId });

        if (!user)
            throw new HttpException('User is not found', 404);

        return (await this._userCartItemsService
            .findAll({ userId: user.id }))
            .map(c => c.book);
    }

    // загрузить файл
    async uploadFile(file: Express.Multer.File, path: string, fileName: string) {
        // const fileName = uuidv4();
        // const fileName = 'dfg';

        fileName = fileName.length > 0 ? fileName : uuidv4();

        const fileStream = fs.createWriteStream(`${path}/${fileName}`);

        fileStream.write(file.buffer);

        fileStream.end();

        return fileName;
    }

    // добавить книгу
    async createBook(bookCreateDto: BookCreateDto) {
        const book = new Book();
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

        await this._bookViewStatisticsService.save(new BookViewStatistic(book, 0));
        await this._bookRatingStatisticsService.save(new BookRatingStatistic(book, 0, 0));

        return result;
    }

    // изменить книгу
    async editBook(bookEditDto: BookEditDto) {
        const book = await this._booksService.findOne({ id: bookEditDto.id }, true);

        if (!book)
            throw new HttpException('Book is not found', 404);

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

    // удалить файл книги
    async deleteBookFile(id: number) {
        const item = await this._bookFilesService.findOne({ id }, true);

        if (!item)
            return new NotFoundException();

        await this._bookFilesService.delete(item);

        fs.unlinkSync(`${process.cwd()}/storage/files/books/${item.path}`);
    }

    // удалить книгу
    async deleteBook(id: number) {
        const item = await this._booksService.findOneWithCartItems({ id });

        if (!item)
            return new NotFoundException();

        await this._userCartItemsService.deleteAll(item.userCartItems);

        await this._booksService.delete(item);
    }

    // восстановить книгу
    async restoreBook(id: number) {
        const item = await this._booksService.findOne({ id }, true);

        if (!item)
            return new NotFoundException();

        item.deletedAt = null;

        await this._booksService.save(item);
    }

    // добавить автора
    async createAuthor(authorCreateDto: AuthorCreateDto) {
        const author = new Author();
        author.name = authorCreateDto.name;
        author.description = authorCreateDto.description;
        author.detailsLink = authorCreateDto.detailsLink;
        author.image = authorCreateDto.image;

        const result = await this._authorsService.save(author);

        await this._authorViewStatisticsService.save(new AuthorViewStatistic(author, 0));

        return result;
    }

    // изменить автора
    async editAuthor(authorEditDto: AuthorEditDto) {
        const author = await this._authorsService.findOne({ id: authorEditDto.id }, true);

        if (!author)
            throw new HttpException('Author is not found', 404);

        author.name = authorEditDto.name;
        author.description = authorEditDto.description;
        author.detailsLink = authorEditDto.detailsLink;
        author.image = authorEditDto.image;

        const result = await this._authorsService.save(author);

        return this._authorsService.save(author);
    }

    // удалить автора
    async deleteAuthor(id: number) {
        const item = await this._authorsService.findOne({ id });

        if (!item)
            return new NotFoundException();

        await this._authorsService.delete(item);
    }

    // восстановить автора
    async restoreAuthor(id: number) {
        const item = await this._authorsService.findOne({ id }, true);

        if (!item)
            return new NotFoundException();

        item.deletedAt = null;

        await this._authorsService.save(item);
    }
}
