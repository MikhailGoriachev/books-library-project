import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { CategoryReportFilterDto } from "../../../../dto/reports/categories/category-report-filter.dto";
import { Observable } from "rxjs";
import { AuthorReportsGroupDto } from "../../../../dto/reports/authors/author-reports-group.dto";

@Injectable({
    providedIn: 'root'
})
export class AuthorsReportsApiService {
    private static readonly basePath = 'authors-reports/'


    constructor(private readonly _apiService: ApiService) { }


    // отчёт об авторах за период
    getAuthorsReportsByPeriod(authorsReportFilter: CategoryReportFilterDto): Observable<AuthorReportsGroupDto> {
        return this._apiService.post(
            AuthorsReportsApiService.basePath + 'by-period',
            authorsReportFilter
        ) as Observable<AuthorReportsGroupDto>;
    }
}
