import { UserReportDto } from "./user-report.dto";

export interface UserReportsGroupDto {
    begin: Date;
    end: Date;
    authorsViewsAmount: number,
    booksViewsAmount: number,
    categoriesViewsAmount: number,
    salesAmount: number,
    avgSalePrice: number,
    profit: number,
    ratingsAmount: number,
    avgRating: number
    reports: UserReportDto[];
}
