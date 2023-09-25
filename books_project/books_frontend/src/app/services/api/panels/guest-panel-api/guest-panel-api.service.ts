import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SetBookRatingDto } from "../../../../dto/auth/set-book-rating.dto";
import { ApiService } from "../../api.service";
import { map, Observable } from "rxjs";
import { UserCartItem } from "../../../../entities/UserCartItem";

@Injectable({
    providedIn: 'root'
})
export class GuestPanelApiService {
    private static readonly basePath = 'guest-panel/';

    constructor(private readonly _apiService: ApiService) {}

    // запись просмотра книги в статистику
    setBookView(bookId: number) {
        return this._apiService.post(GuestPanelApiService.basePath + 'view/book', {bookId});
    }

    // запись просмотра автора в статистику
    setAuthorView(authorId: number) {
        return this._apiService.post(GuestPanelApiService.basePath + 'view/author', {authorId});
    }

    // запись просмотра категории в статистику
    setCategoryView(categoryId: number) {
        return this._apiService.post(GuestPanelApiService.basePath + 'view/category', {categoryId});
    }

    // скачать купленную книгу
    downloadBook(bookFileId: number) {
        return this._apiService.post(GuestPanelApiService.basePath + 'book/download', {bookFileId});
    }
}
