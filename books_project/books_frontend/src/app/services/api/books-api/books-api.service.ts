import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { BookFilterDto } from "../../../dto/filters/book-filter.dto";
import { Book } from "../../../entities/Book";
import { BookDto } from "../../../dto/crud/book.dto";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BooksApiService {

    private static readonly basePath = 'books/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookFilterDto) {
        return this._apiService.get(BooksApiService.basePath, filter)
            .pipe(map((data: Partial<Book>[]) => data.map(a => Book.assign(new Book(), a))));
    }

    findOne(filter?: BookFilterDto) {
        return this._apiService.get(BooksApiService.basePath + '/first', filter)
            .pipe(map(data => Book.assign(new Book(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BooksApiService.basePath + `/${id}`);
    }

    create(item: Book) {
        const dto = new BookDto(
            0, item.title, item.description, item.image, item.price, item.publicationYear, item.isbn
        );
        return this._apiService.post(BooksApiService.basePath, item);
    }

    update(item: Book) {
        const dto = new BookDto(
            item.id, item.title, item.description, item.image, item.price, item.publicationYear, item.isbn
        );
        return this._apiService.put(BooksApiService.basePath, item);
    }
}
