import { Relation } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';
import { BookFile } from './BookFile';
import { Sale } from './Sale';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { BookRatingStatistic } from './BookRatingStatistic';
import { BookViewStatistic } from './BookViewStatistic';
export declare class Book {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    publicationYear: number;
    isbn: string;
    categories: Relation<Category[]>;
    authors: Relation<Author[]>;
    bookFiles: Relation<BookFile[]>;
    sales: Relation<Sale[]>;
    bookRatings: Relation<BookRating[]>;
    bookRatingStatistics: Relation<BookRatingStatistic[]>;
    userCartItems: Relation<UserCartItem[]>;
    bookViews: Relation<BookView[]>;
    bookViewStatistics: Relation<BookViewStatistic[]>;
    constructor(title?: string, description?: any, image?: string, price?: number, publicationYear?: number, isbn?: string);
}
