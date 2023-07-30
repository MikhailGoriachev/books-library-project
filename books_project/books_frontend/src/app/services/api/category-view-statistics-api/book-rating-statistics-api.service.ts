import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { CategoryViewStatistic } from "../../../entities/CategoryViewStatistic";
import { CategoryViewStatisticFilterDto } from "../../../dto/filters/category-view-statistic-filter.dto";
import { CategoryViewStatisticDto } from "../../../dto/crud/category-view-statistic.dto";


@Injectable({
    providedIn: 'root'
})
export class CategoryViewStatisticsApiService {

    private static readonly basePath = 'category-view-statistics/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: CategoryViewStatisticFilterDto) {
        return this._apiService.get(CategoryViewStatisticsApiService.basePath, filter)
            .pipe(map((data: Partial<CategoryViewStatistic>[]) => data.map(a => CategoryViewStatistic.assign(new CategoryViewStatistic(), a))));
    }

    findOne(filter?: CategoryViewStatisticFilterDto) {
        return this._apiService.get(CategoryViewStatisticsApiService.basePath + '/first', filter)
            .pipe(map(data => CategoryViewStatistic.assign(new CategoryViewStatistic(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(CategoryViewStatisticsApiService.basePath + `/${id}`);
    }

    create(item: CategoryViewStatistic) {
        const dto = new CategoryViewStatisticDto(0, item.category.id, item.amount);
        return this._apiService.post(CategoryViewStatisticsApiService.basePath, item);
    }

    update(item: CategoryViewStatistic) {
        const dto = new CategoryViewStatisticDto(item.id, item.category.id, item.amount);
        return this._apiService.put(CategoryViewStatisticsApiService.basePath, item);
    }
}
