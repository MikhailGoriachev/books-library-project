import { Injectable } from '@angular/core';
import { Author } from "../../../entities/Author";
import { ApiService } from "../api.service";
import { AuthorFilterDto } from "../../../dto/filters/author-filter.dto";
import { AuthorDto } from "../../../dto/crud/author.dto";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthorsApiService {
    private static readonly basePath = 'authors/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: AuthorFilterDto) {
        return this._apiService.get(AuthorsApiService.basePath, filter)
            .pipe(map((data: Partial<Author>[]) => data.map(a => Author.assign(new Author(), a))));
    }

    findOne(filter?: AuthorFilterDto) {
        return this._apiService.get(AuthorsApiService.basePath + '/first', filter)
            .pipe(map(data => Author.assign(new Author(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(AuthorsApiService.basePath + `/${id}`)
            .pipe(map(data => Author.assign(new Author(), data)));
    }

    create(item: Author) {
        const dto = new AuthorDto(0, item.name, item.description, item.detailsLink, item.image);
        return this._apiService.post(AuthorsApiService.basePath, item);
    }

    update(item: Author) {
        const dto = new AuthorDto(item.id, item.name, item.description, item.detailsLink, item.image);
        return this._apiService.put(AuthorsApiService.basePath, item);
    }
}
