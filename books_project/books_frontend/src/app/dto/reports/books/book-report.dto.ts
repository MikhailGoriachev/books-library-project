import { Book } from "../../../entities/Book";
import { Sale } from "../../../entities/Sale";
import { BookView } from "../../../entities/BookView";
import { BookRating } from "../../../entities/BookRating";

export interface BookReportDto {
    book: Book,
    sales: Sale[],
    avgSalePrice: number,
    profit: number,
    views: BookView[],
    ratings: BookRating[],
    avgRating: number
}
