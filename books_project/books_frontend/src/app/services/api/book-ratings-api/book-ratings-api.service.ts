import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { BookRatingFilterDto } from "../../../dto/filters/book-rating-filter.dto";
import { BookRating } from "../../../entities/BookRating";
import { BookRatingDto } from "../../../dto/crud/book-rating.dto";


@Injectable({
    providedIn: 'root'
})
export class BookRatingsApiService {

    private static readonly basePath = 'book-ratings/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookRatingFilterDto) {
        return this._apiService.get(BookRatingsApiService.basePath, filter)
            .pipe(map((data: Partial<BookRating>[]) => data.map(a => BookRating.assign(new BookRating(), a))));
    }

    findOne(filter?: BookRatingFilterDto) {
        return this._apiService.get(BookRatingsApiService.basePath + '/first', filter)
            .pipe(map(data => BookRating.assign(new BookRating(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BookRatingsApiService.basePath + `/${id}`);
    }

    create(item: BookRating) {
        const dto = new BookRatingDto(0, item.user.id, item.book.id, item.value);
        return this._apiService.post(BookRatingsApiService.basePath, item);
    }

    update(item: BookRating) {
        const dto = new BookRatingDto(item.id, item.user.id, item.book.id, item.value);
        return this._apiService.put(BookRatingsApiService.basePath, item);
    }
}
