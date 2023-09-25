import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { BookView } from "../../../../entities/BookView";
import { BookViewFilterDto } from "../../../../dto/filters/book-view-filter.dto";
import { BookViewDto } from "../../../../dto/crud/book-view.dto";


@Injectable({
    providedIn: 'root'
})
export class BookViewsApiService {

    private static readonly basePath = 'book-views';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookViewFilterDto) {
        return this._apiService.get(BookViewsApiService.basePath, filter)
            .pipe(map((data: Partial<BookView>[]) => data.map(a => BookView.assign(new BookView(), a))));
    }

    findOne(filter?: BookViewFilterDto) {
        return this._apiService.get(BookViewsApiService.basePath + '/first', filter)
            .pipe(map(data => BookView.assign(new BookView(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BookViewsApiService.basePath + `/${id}`);
    }

    create(item: BookView) {
        const dto = new BookViewDto(0, item.user.id, item.book.id, item.viewedAt);
        return this._apiService.post(BookViewsApiService.basePath, item);
    }

    update(item: BookView) {
        const dto = new BookViewDto(item.id, item.user.id, item.book.id, item.viewedAt);
        return this._apiService.put(BookViewsApiService.basePath, item);
    }
}
