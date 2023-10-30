import { Injectable } from '@angular/core';
import { ApiService } from "../../api.service";
import { CategoryReportFilterDto } from "../../../../dto/reports/categories/category-report-filter.dto";
import { Observable } from "rxjs";
import { CategoryReportsGroupDto } from "../../../../dto/reports/categories/category-reports-group.dto";
import { UserReportFilterDto } from "../../../../dto/reports/users/user-report-filter.dto";
import { UserReportsGroupDto } from "../../../../dto/reports/users/user-reports-group.dto";

@Injectable({
  providedIn: 'root'
})
export class UsersReportsApiService {

    private static readonly basePath = 'users-reports/'

    constructor(private readonly _apiService: ApiService) { }

    // отчёт о пользователях за период
    getUsersReportsByPeriod(userReportFilterDto: UserReportFilterDto): Observable<UserReportsGroupDto> {
        return this._apiService.post(
            UsersReportsApiService.basePath + 'by-period',
            userReportFilterDto
        ) as Observable<UserReportsGroupDto>;
    }
}
