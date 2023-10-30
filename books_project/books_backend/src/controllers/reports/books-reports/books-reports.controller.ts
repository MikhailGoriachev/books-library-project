import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksReportsService } from '../../../services/reports/books-reports/books-reports.service';
import { BooksReportFilterDto } from '../../../dto/reports/books/books-report-filter.dto';

@Controller('books-reports')
export class BooksReportsController {
    
    constructor(private readonly _booksReportsService: BooksReportsService) {}
    
    // самая рейтинговая книга
    @Get('by-max-rating')
    async getBooksByMaxRating() {
        return this._booksReportsService.getBooksByMaxRating();
    }
        
    // самая просматриваемая книга
    @Get('by-max-viewed')
    async getBookByMaxViewed() {
        return this._booksReportsService.getBooksByMaxViewed();
    }
    
    // самая продаваемая книга
    @Get('by-max-sales')
    async getBooksByMaxSales() {
        return this._booksReportsService.getBooksByMaxSales();
    }
    
    // получить отчёт о книгах за период
    @Post('by-period')
    async getBooksByPeriod(@Body() periodDto: BooksReportFilterDto) {
        return this._booksReportsService.getBooksByPeriod(periodDto);
    }
}
