import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { CategoryView } from "../../../entities/CategoryView";
import { CategoryViewFilterDto } from "../../../dto/filters/category-view-filter.dto";
import { CategoryViewDto } from "../../../dto/crud/category-view.dto";


@Injectable({
    providedIn: 'root'
})
export class CategoryViewsApiService {

    private static readonly basePath = 'category-views/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: CategoryViewFilterDto) {
        return this._apiService.get(CategoryViewsApiService.basePath, filter)
            .pipe(map((data: Partial<CategoryView>[]) => data.map(a => CategoryView.assign(new CategoryView(), a))));
    }

    findOne(filter?: CategoryViewFilterDto) {
        return this._apiService.get(CategoryViewsApiService.basePath + '/first', filter)
            .pipe(map(data => CategoryView.assign(new CategoryView(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(CategoryViewsApiService.basePath + `/${id}`);
    }

    create(item: CategoryView) {
        const dto = new CategoryViewDto(0, item.user.id, item.category.id, item.viewedAt);
        return this._apiService.post(CategoryViewsApiService.basePath, item);
    }

    update(item: CategoryView) {
        const dto = new CategoryViewDto(item.id, item.user.id, item.category.id, item.viewedAt);
        return this._apiService.put(CategoryViewsApiService.basePath, item);
    }
}
