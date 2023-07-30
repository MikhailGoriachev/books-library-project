import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { AuthorViewStatistic } from "../../../entities/AuthorViewStatistic";
import { AuthorViewStatisticFilterDto } from "../../../dto/filters/author-view-statistic-filter.dto";
import { AuthorViewStatisticDto } from "../../../dto/crud/author-view-statistic.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthorViewStatisticsApiService {
    private static readonly basePath = 'author-view-statistics/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: AuthorViewStatisticFilterDto) {
        return this._apiService.get(AuthorViewStatisticsApiService.basePath, filter)
            .pipe(map((data: Partial<AuthorViewStatistic>[]) =>
                data.map(a => AuthorViewStatistic.assign(new AuthorViewStatistic(), a))));
    }

    findOne(filter?: AuthorViewStatisticFilterDto) {
        return this._apiService.get(AuthorViewStatisticsApiService.basePath + '/first', filter)
            .pipe(map(data => AuthorViewStatistic.assign(new AuthorViewStatistic(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(AuthorViewStatisticsApiService.basePath + `/${id}`)
            .pipe(map(data => AuthorViewStatistic.assign(new AuthorViewStatistic(), data)));
    }

    create(item: AuthorViewStatistic) {
        const dto = new AuthorViewStatisticDto(0, item.author ? item.author.id : null, item.amount);
        return this._apiService.post(AuthorViewStatisticsApiService.basePath, item);
    }

    update(item: AuthorViewStatistic) {
        const dto = new AuthorViewStatisticDto(item.id, item.author ? item.author.id : null, item.amount);
        return this._apiService.put(AuthorViewStatisticsApiService.basePath, item);
    }
}
