import { Injectable } from '@angular/core';
import { CategoryReportFilterDto } from "../../../../dto/reports/categories/category-report-filter.dto";
import { Observable } from "rxjs";
import { AuthorReportsGroupDto } from "../../../../dto/reports/authors/author-reports-group.dto";
import { CategoryReportsGroupDto } from "../../../../dto/reports/categories/category-reports-group.dto";
import { ApiService } from "../../api.service";

@Injectable({
    providedIn: 'root'
})
export class CategoriesReportsApiService {
    private static readonly basePath = 'categories-reports/'

    constructor(private readonly _apiService: ApiService) { }

    // отчёт о категориях за период
    getCategoriesReportsByPeriod(categoryReportFilter: CategoryReportFilterDto): Observable<CategoryReportsGroupDto> {
        return this._apiService.post(
            CategoriesReportsApiService.basePath + 'by-period',
            categoryReportFilter
        ) as Observable<CategoryReportsGroupDto>;
    }
}
