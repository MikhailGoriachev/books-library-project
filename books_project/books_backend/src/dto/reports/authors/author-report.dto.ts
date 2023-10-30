import { Sale } from '../../../database/entities/Sale';
import { BookView } from '../../../database/entities/BookView';
import { BookRating } from '../../../database/entities/BookRating';
import { Author } from '../../../database/entities/Author';
import { AuthorView } from '../../../database/entities/AuthorView';

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