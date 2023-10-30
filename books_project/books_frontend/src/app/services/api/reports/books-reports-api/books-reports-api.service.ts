import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserRoleDto } from "../../../../dto/user-role.dto";
import { ApiService } from "../../api.service";
import { map, Observable } from "rxjs";
import { BookCreateDto } from "../../../../dto/admin-panel/book/book-create.dto";
import { BookEditDto } from "../../../../dto/admin-panel/book/book-edit.dto";
import { Book } from "../../../../entities/Book";
import { AuthorCreateDto } from "../../../../dto/admin-panel/author/author-create.dto";
import { Author } from "../../../../entities/Author";
import { AuthorEditDto } from "../../../../dto/admin-panel/author/author-edit.dto";
import { UserCreateDto } from "../../../../dto/admin-panel/user/user-create.dto";
import { UserEditDto } from "../../../../dto/admin-panel/user/user-edit.dto";
import { User } from "../../../../entities/User";
import { Sale } from "../../../../entities/Sale";
import { BooksReportFilterDto } from "../../../../dto/reports/books/books-report-filter.dto";
import { BookReportsGroupDto } from "../../../../dto/reports/books/book-reports-group.dto";

@Injectable({
    providedIn: 'root'
})
export class BooksReportsApiService {
    private static readonly basePath = 'books-reports/'

    constructor(private readonly _apiService: ApiService) {}

    // отчёт о книгах за период
    getBooksReportsByPeriod(booksReportFilter: BooksReportFilterDto): Observable<BookReportsGroupDto> {
        return this._apiService.post(
            BooksReportsApiService.basePath + 'by-period',
            booksReportFilter
        ) as Observable<BookReportsGroupDto>;
    }
}
