import { Injectable } from '@angular/core';
import { ApiService } from "../api.service";
import { map } from "rxjs";
import { BookFileFilterDto } from "../../../dto/filters/book-file-filter.dto";
import { BookFile } from "../../../entities/BookFile";
import { BookFileDto } from "../../../dto/crud/book-file.dto";

@Injectable({
    providedIn: 'root'
})
export class BookFilesApiService {

    private static readonly basePath = 'book-files/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookFileFilterDto) {
        return this._apiService.get(BookFilesApiService.basePath, filter)
            .pipe(map((data: Partial<BookFile>[]) => data.map(a => BookFile.assign(new BookFile(), a))));
    }

    findOne(filter?: BookFileFilterDto) {
        return this._apiService.get(BookFilesApiService.basePath + '/first', filter)
            .pipe(map(data => BookFile.assign(new BookFile(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BookFilesApiService.basePath + `/${id}`);
    }

    create(item: BookFile) {
        const dto = new BookFileDto(0, item.path, item.fileExtension.id, item.book.id);
        return this._apiService.post(BookFilesApiService.basePath, item);
    }

    update(item: BookFile) {
        const dto = new BookFileDto(item.id, item.path, item.fileExtension.id, item.book.id);
        return this._apiService.put(BookFilesApiService.basePath, item);
    }
}
