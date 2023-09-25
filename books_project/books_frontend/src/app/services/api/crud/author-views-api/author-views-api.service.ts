import { Injectable } from '@angular/core';
import { Author } from "../../../../entities/Author";
import { ApiService } from "../../api.service";
import { AuthorFilterDto } from "../../../../dto/filters/author-filter.dto";
import { AuthorDto } from "../../../../dto/crud/author.dto";
import { map } from "rxjs";
import { AuthorViewFilterDto } from "../../../../dto/filters/author-view-filter.dto";
import { AuthorView } from "../../../../entities/AuthorView";
import { AuthorViewDto } from "../../../../dto/crud/author-view.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthorViewsApiService {
    private static readonly basePath = 'author-views';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: AuthorViewFilterDto) {
        return this._apiService.get(AuthorViewsApiService.basePath, filter)
            .pipe(map((data: Partial<AuthorView>[]) => data.map(a => AuthorView.assign(new AuthorView(), a))));
    }

    findOne(filter?: AuthorViewFilterDto) {
        return this._apiService.get(AuthorViewsApiService.basePath + '/first', filter)
            .pipe(map(data => AuthorView.assign(new AuthorView(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(AuthorViewsApiService.basePath + `/${id}`)
            .pipe(map(data => AuthorView.assign(new AuthorView(), data)));
    }

    create(item: AuthorView) {
        const dto = new AuthorViewDto(0, item.user.id, item.author.id, item.viewedAt);
        return this._apiService.post(AuthorViewsApiService.basePath, item);
    }

    update(item: AuthorView) {
        const dto = new AuthorViewDto(item.id, item.user.id, item.author.id, item.viewedAt);
        return this._apiService.put(AuthorViewsApiService.basePath, item);
    }
}
