import { BookReportDto } from './book-report.dto';

export interface BookReportsGroupDto {
    begin: Date,
    end: Date,
    salesAmount: number;
    avgSalePrice: number;
    profit: number;
    viewsAmount: number;
    ratingsAmount: number;
    avgRating: number;
    reports: BookReportDto[]
}
