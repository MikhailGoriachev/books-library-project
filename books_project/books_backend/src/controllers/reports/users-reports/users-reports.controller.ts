import { Body, Controller, Post } from '@nestjs/common';
import { BooksReportFilterDto } from '../../../dto/reports/books/books-report-filter.dto';
import { AuthorsReportsService } from '../../../services/reports/authors-reports/authors-reports.service';
import { UsersReportsService } from '../../../services/reports/users-reports/users-reports.service';
import { UserReportFilterDto } from '../../../dto/reports/users/user-report-filter.dto';

@Controller('users-reports')
export class UsersReportsController {
    constructor(private readonly _usersReportsService: UsersReportsService) {}
    
    // получить отчёт о пользователях за период
    @Post('by-period')
    async getCategoriesByPeriod(@Body() periodDto: UserReportFilterDto) {
        return this._usersReportsService.getUsersByPeriod(periodDto);
    }
}
