import { Author } from "../../../entities/Author";
import { AuthorView } from "../../../entities/AuthorView";
import { Sale } from "../../../entities/Sale";
import { BookView } from "../../../entities/BookView";
import { BookRating } from "../../../entities/BookRating";

export interface AuthorReportDto {
    author: Author,
    views: AuthorView[],
    sales: Sale[],
    avgSalePrice: number,
    profit: number,
    booksViews: BookView[],
    ratings: BookRating[],
    avgRating: number
}
