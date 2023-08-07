import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SetBookRatingDto } from "../../../../dto/auth/set-book-rating.dto";
import { ApiService } from "../../api.service";

@Injectable({
    providedIn: 'root'
})
export class UserPanelApiService {
    private static readonly basePath = 'user-panel/';

    constructor(private readonly _apiService: ApiService) {}

    // добавить книгу в корзину
    addBookToCart(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'cart/add-book', bookId);
    }

    // удалить книгу из корзины
    removeBookFromCart(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'cart/remove-book', bookId);
    }

    // очистить корзину
    clearCart() {
        return this._apiService.get(UserPanelApiService.basePath + 'cart/clear');
    }

    // получить список книг в корзине
    getBooksFromCart() {
        return this._apiService.get(UserPanelApiService.basePath + 'cart');
    }

    // установить оценку книги
    setBookRating(rating: SetBookRatingDto) {
        return this._apiService.post(UserPanelApiService.basePath + 'book/rating/set', rating);
    }

    // удалить оценку книги
    removeBookRating(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'book/rating/remove', bookId);
    }

    // запись просмотра книги в статистику
    setBookView(bookId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/book', bookId);
    }

    // запись просмотра автора в статистику
    setAuthorView(authorId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/author', authorId);
    }

    // запись просмотра категории в статистику
    setCategoryView(categoryId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'view/category', categoryId);
    }

    // скачать купленную книгу
    downloadBook(bookFileId: number) {
        return this._apiService.post(UserPanelApiService.basePath + 'book/download', bookFileId);
    }
}
