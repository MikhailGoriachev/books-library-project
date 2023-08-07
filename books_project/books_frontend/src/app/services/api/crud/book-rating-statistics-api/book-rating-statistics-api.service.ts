import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { BookRatingStatistic } from "../../../../entities/BookRatingStatistic";
import { BookRatingStatisticFilterDto } from "../../../../dto/filters/book-rating-statistic-filter.dto";
import { BookRatingStatisticDto } from "../../../../dto/crud/book-rating-statistic.dto";


@Injectable({
    providedIn: 'root'
})
export class BookRatingStatisticsApiService {

    private static readonly basePath = 'book-rating-statistics/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookRatingStatisticFilterDto) {
        return this._apiService.get(BookRatingStatisticsApiService.basePath, filter)
            .pipe(map((data: Partial<BookRatingStatistic>[]) => data.map(a => BookRatingStatistic.assign(new BookRatingStatistic(), a))));
    }

    findOne(filter?: BookRatingStatisticFilterDto) {
        return this._apiService.get(BookRatingStatisticsApiService.basePath + '/first', filter)
            .pipe(map(data => BookRatingStatistic.assign(new BookRatingStatistic(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BookRatingStatisticsApiService.basePath + `/${id}`);
    }

    create(item: BookRatingStatistic) {
        const dto = new BookRatingStatisticDto(0, item.book.id, item.value);
        return this._apiService.post(BookRatingStatisticsApiService.basePath, item);
    }

    update(item: BookRatingStatistic) {
        const dto = new BookRatingStatisticDto(item.id, item.book.id, item.value);
        return this._apiService.put(BookRatingStatisticsApiService.basePath, item);
    }
}
