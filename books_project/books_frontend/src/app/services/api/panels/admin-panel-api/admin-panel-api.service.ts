import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserRoleDto } from "../../../../dto/user-role.dto";
import { ApiService } from "../../api.service";
import { map, Observable } from "rxjs";
import { BookCreateDto } from "../../../../dto/admin-panel/book/book-create.dto";
import { BookEditDto } from "../../../../dto/admin-panel/book/book-edit.dto";
import { Book } from "../../../../entities/Book";
import { AuthorCreateDto } from "../../../../dto/admin-panel/author/author-create.dto";
import { Author } from "../../../../entities/Author";
import { AuthorEditDto } from "../../../../dto/admin-panel/author/author-edit.dto";
import { UserCreateDto } from "../../../../dto/admin-panel/user/user-create.dto";
import { UserEditDto } from "../../../../dto/admin-panel/user/user-edit.dto";
import { User } from "../../../../entities/User";
import { Sale } from "../../../../entities/Sale";

@Injectable({
    providedIn: 'root'
})
export class AdminPanelApiService {
    private static readonly basePath = 'admin-panel/'

    constructor(private readonly _apiService: ApiService) {}

    // добавить данные о пользователе
    createUser(userCreateDto: UserCreateDto): Observable<User> {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/create', userCreateDto) as Observable<User>;
    }

    // изменить данные о пользователе
    editUser(userEditDto: UserEditDto): Observable<User> {
        return this._apiService.put(AdminPanelApiService.basePath + 'user/edit', userEditDto) as Observable<User>;
    }

    // изменить данные о пользователе
    resetPasswordUser(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/reset-password', {userId});
    }

    // отправить файл изображение книги
    uploadUserImageFile(formData: FormData) {
        return this._apiService.post(AdminPanelApiService.basePath + 'upload/user/image', formData) as
            Observable<{ fileName: string }>;
    }

    // заблокировать пользователя
    blockUser(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/block', {userId});
    }

    // разблокировать пользователя
    unblockUser(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/unblock', {userId});
    }

    // получить роли пользователей
    userRoles(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles', {userId});
    }

    // назначить роль пользователя
    addUserRole(userRole: UserRoleDto) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles/add', userRole);
    }

    // убрать роль пользователя
    removeUserRole(userRole: UserRoleDto) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles/remove', userRole);
    }

    // получить список книг в корзине
    getUserBooksFromCart(userId: number): Observable<Book[]> {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/cart', {userId})
                   .pipe(map((data: []) => data.map(s => Book.assign(new Book(), s)))) as Observable<Book[]>;
    }

    // получить список покупок
    getUserSales(userId: number): Observable<Sale[]> {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/sales', {userId})
                   .pipe(map((data: []) => data.map(s => Sale.assign(new Sale(), s)))) as Observable<Sale[]>;
    }

    // добавить данные о книге
    createBook(bookCreateDto: BookCreateDto): Observable<Book> {
        return this._apiService.post(AdminPanelApiService.basePath + 'books/create', bookCreateDto) as Observable<Book>;
    }

    // изменить данные о книге
    editBook(bookEditDto: BookEditDto): Observable<Book> {
        return this._apiService.put(AdminPanelApiService.basePath + 'books/edit', bookEditDto) as Observable<Book>;
    }

    // отправить файл изображение книги
    uploadBookImageFile(formData: FormData) {
        return this._apiService.post(AdminPanelApiService.basePath + 'upload/book/image', formData) as
            Observable<{ fileName: string }>;
    }

    // отправить файл книги
    uploadBookFile(formData: FormData) {
        return this._apiService.post(AdminPanelApiService.basePath + 'upload/book/file', formData) as
            Observable<{ fileName: string }>;
    }

    // удалить файл книги
    deleteBookFile(id: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'delete/book/file', {bookFileId: id});
    }

    // удалить книгу
    deleteBook(id: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'delete/book', {bookId: id});
    }

    // восстановить книгу
    restoreBook(id: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'restore/book', {bookId: id});
    }

    // добавить данные о книге
    createAuthor(authorCreateDto: AuthorCreateDto): Observable<Author> {
        return this._apiService.post(
            AdminPanelApiService.basePath + 'authors/create',
            authorCreateDto
        ) as Observable<Author>;
    }

    // изменить данные о книге
    editAuthor(authorEditDto: AuthorEditDto): Observable<Author> {
        return this._apiService.put(
            AdminPanelApiService.basePath + 'authors/edit',
            authorEditDto
        ) as Observable<Author>;
    }

    // отправить файл изображение книги
    uploadAuthorImageFile(formData: FormData) {
        return this._apiService.post(AdminPanelApiService.basePath + 'upload/author/image', formData) as
            Observable<{ fileName: string }>;
    }

    // удалить книгу
    deleteAuthor(id: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'delete/author', {authorId: id});
    }

    // восстановить книгу
    restoreAuthor(id: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'restore/author', {authorId: id});
    }
}
