import { Injectable } from '@angular/core';
import { Author } from "../../../../entities/Author";
import { ApiService } from "../../api.service";
import { AuthorFilterDto } from "../../../../dto/filters/author-filter.dto";
import { AuthorDto } from "../../../../dto/crud/author.dto";
import { map, tap } from "rxjs";
import { PageDto } from "../../../../dto/pagination/page.dto";
import { AuthorPaginationFilterDto } from "../../../../dto/filters/author-pagination-filter.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthorsApiService {
    private static readonly basePath = 'authors';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: AuthorFilterDto) {
        return this._apiService.get(AuthorsApiService.basePath, filter)
            .pipe(map((data: Partial<Author>[]) => data.map(a => Author.assign(new Author(), a))));
    }

    findOne(filter?: AuthorFilterDto) {
        return this._apiService.get(AuthorsApiService.basePath + '/first', filter)
            .pipe(map(data => Author.assign(new Author(), data)));
    }

    findAllPagination(filter?: Partial<AuthorPaginationFilterDto>) {
        return this._apiService.get(AuthorsApiService.basePath + '/pagination', filter)
                   .pipe(tap((data: PageDto<Author>) => data.data.map(a => Author.assign(new Author(), a))));
    }

    findOneById(id: number) {
        return this._apiService.get(AuthorsApiService.basePath + `/${id}`)
            .pipe(map(data => Author.assign(new Author(), data)));
    }

    findAllWithDeleted(filter?: AuthorFilterDto) {
        return this._apiService.get(`${AuthorsApiService.basePath}/with-deleted`, filter)
            .pipe(map((data: Partial<Author>[]) => data.map(a => Author.assign(new Author(), a))));
    }

    findOneWithDeleted(filter?: AuthorFilterDto) {
        return this._apiService.get(`${AuthorsApiService.basePath}/first/with-deleted`, filter)
            .pipe(map(data => Author.assign(new Author(), data)));
    }

    findAllPaginationWithDeleted(filter?: Partial<AuthorPaginationFilterDto>) {
        return this._apiService.get(`${AuthorsApiService.basePath}/pagination/with-deleted`, filter)
                   .pipe(tap((data: PageDto<Author>) => data.data.map(a => Author.assign(new Author(), a))));
    }

    findOneByIdWithDeleted(id: number) {
        return this._apiService.get(`${AuthorsApiService.basePath}/${id}/with-deleted`)
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
