import { Injectable } from '@angular/core';
import { Category } from "../../../entities/Category";
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { CategoryFilterDto } from "../../../dto/filters/category-filter.dto";
import { CategoryDto } from "../../../dto/crud/category.dto";

@Injectable({
    providedIn: 'root'
})
export class CategoriesApiService {
    private static readonly basePath = 'categories/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: CategoryFilterDto) {
        return this._apiService.get(CategoriesApiService.basePath, filter)
            .pipe(map((data: Partial<Category>[]) => data.map(a => Category.assign(new Category(), a))));
    }

    findOne(filter?: CategoryFilterDto) {
        return this._apiService.get(CategoriesApiService.basePath + '/first', filter)
            .pipe(map(data => Category.assign(new Category(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(CategoriesApiService.basePath + `/${id}`)
            .pipe(map(data => Category.assign(new Category(), data)));
    }

    create(item: Category) {
        const dto = new CategoryDto(0, item.name);
        return this._apiService.post(CategoriesApiService.basePath, item);
    }

    update(item: Category) {
        const dto = new CategoryDto(item.id, item.name);
        return this._apiService.put(CategoriesApiService.basePath, item);
    }
}
