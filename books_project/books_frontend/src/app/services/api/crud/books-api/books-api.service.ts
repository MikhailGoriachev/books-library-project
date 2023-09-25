import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { BookFilterDto } from "../../../../dto/filters/book-filter.dto";
import { Book } from "../../../../entities/Book";
import { BookDto } from "../../../../dto/crud/book.dto";
import { map, Observable, tap } from "rxjs";
import { BookPaginationFilterDto } from "../../../../dto/filters/book-pagination-filter.dto";
import { PageDto } from "../../../../dto/pagination/page.dto";
import { RangeDto } from "../../../../dto/range.dto";

@Injectable({
    providedIn: 'root'
})
export class BooksApiService {

    private static readonly basePath = 'books';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BookFilterDto) {
        return this._apiService.get(BooksApiService.basePath, filter)
                   .pipe(map((data: Partial<Book>[]) =>
                       data.map(a => Book.assign(new Book(), a))
                   ));
    }

    findAllPagination(filter?: Partial<BookPaginationFilterDto>) {
        return this._apiService.get(BooksApiService.basePath + '/pagination', filter)
                   .pipe(tap((data: PageDto<Book>) =>
                       data.data.forEach(a => Book.assign(new Book(), a))
                   ));
    }

    findOne(filter?: BookFilterDto) {
        return this._apiService.get(BooksApiService.basePath + '/first', filter)
                   .pipe(map(data => Book.assign(new Book(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(`${BooksApiService.basePath}/${id}`)
                   .pipe(map(data => Book.assign(new Book(), data)));
    }

    findAllWithDeleted(filter?: BookFilterDto) {
        return this._apiService.get(`${BooksApiService.basePath}/with-deleted`, filter)
                   .pipe(map((data: Partial<Book>[]) =>
                       data.map(a => Book.assign(new Book(), a))
                   ));
    }

    findAllPaginationWithDeleted(filter?: Partial<BookPaginationFilterDto>) {
        return this._apiService.get(`${BooksApiService.basePath}/pagination/with-deleted`, filter)
                   .pipe(tap((data: PageDto<Book>) =>
                       data.data.forEach(a => Book.assign(new Book(), a))
                   ));
    }

    findOneWithDeleted(filter?: BookFilterDto) {
        return this._apiService.get(`${BooksApiService.basePath}/first/with-deleted`, filter)
                   .pipe(map(data => Book.assign(new Book(), data)));
    }

    findOneByIdWithDeleted(id: number) {
        return this._apiService.get(`${BooksApiService.basePath}/${id}/with-deleted`)
                   .pipe(map(data => Book.assign(new Book(), data)));
    }

    create(item: Book) {
        const dto = new BookDto(
            0, item.title, item.description, item.image, item.price, item.publicationYear, item.isbn
        );
        return this._apiService.post(BooksApiService.basePath, dto);
    }

    update(item: Book) {
        const dto = new BookDto(
            item.id, item.title, item.description, item.image, item.price, item.publicationYear, item.isbn
        );
        return this._apiService.put(BooksApiService.basePath, dto) as Observable<Book>;
    }

    getPriceRange(): Observable<RangeDto> {
        return this._apiService.get(BooksApiService.basePath + '/price-range') as Observable<RangeDto>;
    }

    getPublicationYearRange(): Observable<RangeDto> {
        return this._apiService.get(BooksApiService.basePath + '/publication-year-range') as Observable<RangeDto>;
    }

    // десять самых рейтинговых книг
    topBooksByRating(): Observable<Book[]> {
        return this._apiService.get(BooksApiService.basePath + '/top-by-rating')
                   .pipe(map((data: Partial<Book>[]) =>
                       data.map(a => Book.assign(new Book(), a))
                   ));
    }

    // десять самых просматриваемых книг
    topBooksByViewed(): Observable<Book[]> {
        return this._apiService.get(BooksApiService.basePath + '/top-by-viewed')
                   .pipe(map((data: Partial<Book>[]) =>
                       data.map(a => Book.assign(new Book(), a))
                   ));
    }

    // десять последних добавленных книг
    topBooksByAddition(): Observable<Book[]> {
        return this._apiService.get(BooksApiService.basePath + '/top-by-addition')
                   .pipe(map((data: Partial<Book>[]) =>
                       data.map(a => Book.assign(new Book(), a))
                   ));
    }

}
