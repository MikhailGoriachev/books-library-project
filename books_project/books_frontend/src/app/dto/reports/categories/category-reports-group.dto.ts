import { CategoryReportDto } from "./category-report.dto";

export interface CategoryReportsGroupDto {
    begin: Date,
    end: Date,
    viewsAmount: number,
    salesAmount: number,
    avgSalePrice: number,
    profit: number,
    booksViewsAmount: number,
    ratingsAmount: number,
    avgRating: number
    reports: CategoryReportDto[]
}
