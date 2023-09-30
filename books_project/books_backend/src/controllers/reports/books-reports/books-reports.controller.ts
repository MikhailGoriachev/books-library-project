import { Controller, Get } from '@nestjs/common';
import { BooksReportsService } from '../../../services/reports/book-reports/books-reports.service';

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
    async getBookByMaxSales() {
        return this._booksReportsService.getBookByMaxSales();
    }
}
