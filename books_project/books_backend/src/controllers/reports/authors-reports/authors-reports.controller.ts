import { Body, Controller, Post } from '@nestjs/common';
import { AuthorsReportsService } from '../../../services/reports/authors-reports/authors-reports.service';
import { AuthorReportFilterDto } from '../../../dto/reports/authors/author-report-filter.dto';

@Controller('authors-reports')
export class AuthorsReportsController {
    constructor(private readonly _authorsReportsService: AuthorsReportsService) {}
    
    // получить отчёт об авторах за период
    @Post('by-period')
    async getBooksByPeriod(@Body() periodDto: AuthorReportFilterDto) {
        return this._authorsReportsService.getAuthorsByPeriod(periodDto);
    }
}
