import { Injectable } from '@angular/core';
import { SetBookRatingDto } from "../../../../dto/auth/set-book-rating.dto";
import { ApiService } from "../../api.service";
import { map, Observable, tap } from "rxjs";
import { UserCartItem } from "../../../../entities/UserCartItem";
import { Book } from "../../../../entities/Book";
import { BookRating } from "../../../../entities/BookRating";
import { DataManagerService } from "../../../data-manager/data-manager.service";
import { EventsService } from "../../../events/events.service";
import { Sale } from "../../../../entities/Sale";
import { LocalStorageService } from "../../../local-storage/local-storage.service";
import { UserEditProfileDto } from "../../../../dto/user-panel/user-edit-profile.dto";
import { User } from "../../../../entities/User";
import { UserPasswordEditDto } from "../../../../dto/user-panel/user-password-edit.dto";

@Injectable({
    providedIn: 'root'
})
export class UserPanelApiService {
    private static readonly basePath = 'user-panel/';

    constructor(
        private readonly _apiService: ApiService,
        private readonly _eventsService: EventsService,
        private readonly _localStorageService: LocalStorageService
    ) {}

    // добавить книгу в корзину
    addBookToCart(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'cart/add-book', {bookId});
    }

    // добавить коллекцию книг в корзину
    addBookListToCart(bookIds: number[]) {
        return this._apiService.post(UserPanelApiService.basePath + 'cart/add-book-list', {bookIds});
    }

    // удалить книгу из корзины
    removeBookFromCart(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'cart/remove-book', {bookId});
    }

    // очистить корзину
    clearCart() {
        return this._apiService.get(UserPanelApiService.basePath + 'cart/clear');
    }

    // получить список книг в корзине
    getBooksFromCart() {
        return this._apiService.get(UserPanelApiService.basePath + 'cart')
                   .pipe(map((d: any) => d.map(c => Book.assign(new Book(), c)))) as Observable<Book[]>;
    }

    // установить оценку книги
    setBookRating(rating: SetBookRatingDto) {
        return this._apiService.post(UserPanelApiService.basePath + 'book/rating/set', {...rating})
                   .pipe(
                       map(r => r ? BookRating.assign(new BookRating(), r) : null),
                       tap(r => this._eventsService.changeBookRating.next({id: r.book.id}))
                   );
    }

    // удалить оценку книги
    removeBookRating(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'book/rating/remove', {bookId})
                   .pipe(tap(_ => this._eventsService.changeBookRating.next({id: bookId})));
    }

    // получить оценку книги
    getBookRating(bookId: number): Observable<BookRating | null> {
        return this._apiService.post(UserPanelApiService.basePath + 'book/rating', {bookId})
                   .pipe(map(r => r ? BookRating.assign(new BookRating(), r) : null));
    }

    // запись просмотра книги в статистику
    setBookView(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/book', {bookId});
    }

    // запись просмотра автора в статистику
    setAuthorView(authorId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/author', {authorId});
    }

    // запись просмотра категории в статистику
    setCategoryView(categoryId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/category', {categoryId});
    }

    // скачать купленную книгу
    downloadBook(bookFileId: number) {
        return this._apiService.downloadFile(UserPanelApiService.basePath + 'book/download', {bookFileId},);
    }

    // получить список покупок
    getSales() {
        return this._apiService.get(UserPanelApiService.basePath + 'sales')
                   .pipe(map((d: any) => d.map(c => Sale.assign(new Sale(), c)))) as Observable<Sale[]>;
    }

    // купить книги
    buy() {
        return this._apiService.get(UserPanelApiService.basePath + 'buy')
                   .pipe(map((d: any) => d.map(c => Sale.assign(new Sale(), c)))) as Observable<Sale[]>;
    }

    // обновить данные профиля
    profileEdit(userEditProfileDto: UserEditProfileDto) {
        return this._apiService.post(UserPanelApiService.basePath + 'profile/edit', userEditProfileDto)
                   .pipe(
                       map((u: any) => User.assign(new User(), u)),
                       tap(u => this._eventsService.changeCurrentUser.next(u))
                   );
    }

    // обновить пароль
    passwordEdit(userPasswordEdit: UserPasswordEditDto): Observable<{ result: boolean }> {
        return this._apiService.post(
            UserPanelApiService.basePath + 'profile/password-edit',
            userPasswordEdit
        ) as Observable<{ result: boolean }>;
    }

    // отправить файл изображение пользователя
    uploadBookImageFile(formData: FormData) {
        return this._apiService.post(UserPanelApiService.basePath + 'upload/profile/image', formData) as
            Observable<{ fileName: string }>;
    }
}
