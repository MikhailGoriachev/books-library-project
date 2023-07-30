import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { BookViewStatistic } from "../../../entities/BookViewStatistic";
import { BookViewStatisticFilterDto } from "../../../dto/filters/book-view-statistic-filter.dto";
import { BookViewStatisticDto } from "../../../dto/crud/book-view-statistic.dto";


@Injectable({
    providedIn: 'root'
})
export class BookViewStatisticsApiService {

    private static readonly basePath = 'book-view-statistics/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookViewStatisticFilterDto) {
        return this._apiService.get(BookViewStatisticsApiService.basePath, filter)
            .pipe(map((data: Partial<BookViewStatistic>[]) => data.map(a => BookViewStatistic.assign(new BookViewStatistic(), a))));
    }

    findOne(filter?: BookViewStatisticFilterDto) {
        return this._apiService.get(BookViewStatisticsApiService.basePath + '/first', filter)
            .pipe(map(data => BookViewStatistic.assign(new BookViewStatistic(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BookViewStatisticsApiService.basePath + `/${id}`);
    }

    create(item: BookViewStatistic) {
        const dto = new BookViewStatisticDto(0, item.book.id, item.amount);
        return this._apiService.post(BookViewStatisticsApiService.basePath, item);
    }

    update(item: BookViewStatistic) {
        const dto = new BookViewStatisticDto(item.id, item.book.id, item.amount);
        return this._apiService.put(BookViewStatisticsApiService.basePath, item);
    }
}
