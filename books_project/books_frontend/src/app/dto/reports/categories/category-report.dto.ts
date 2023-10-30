import { Author } from "../../../entities/Author";
import { AuthorView } from "../../../entities/AuthorView";
import { Sale } from "../../../entities/Sale";
import { BookView } from "../../../entities/BookView";
import { BookRating } from "../../../entities/BookRating";
import { Category } from "../../../entities/Category";
import { CategoryView } from "../../../entities/CategoryView";

export interface CategoryReportDto {
    category: Category,
    views: CategoryView[],
    sales: Sale[],
    avgSalePrice: number,
    profit: number,
    booksViews: BookView[],
    ratings: BookRating[],
    avgRating: number
}
