import { AuthorReportDto } from './author-report.dto';

export interface AuthorReportsGroupDto {
    begin: Date;
    end: Date;
    viewsAmount: number;
    salesAmount: number;
    avgSalePrice: number;
    profit: number;
    booksViewsAmount: number;
    ratingsAmount: number;
    avgRating: number;
    reports: AuthorReportDto[];
}