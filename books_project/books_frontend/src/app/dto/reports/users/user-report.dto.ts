import { User } from "../../../entities/User";
import { AuthorView } from "../../../entities/AuthorView";
import { BookView } from "../../../entities/BookView";
import { CategoryView } from "../../../entities/CategoryView";
import { Sale } from "../../../entities/Sale";
import { BookRating } from "../../../entities/BookRating";

export interface UserReportDto {
    user: User,
    authorsViews: AuthorView[],
    booksViews: BookView[],
    categoriesViews: CategoryView[],
    sales: Sale[],
    avgSalePrice: number,
    profit: number,
    ratings: BookRating[],
    avgRating: number
}
