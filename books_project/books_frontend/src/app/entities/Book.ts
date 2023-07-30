import { Category } from './Category';
import { Author } from './Author';
import { Sale } from './Sale';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { BookRatingStatistic } from './BookRatingStatistic';
import { BookViewStatistic } from './BookViewStatistic';
import { BookFile } from './BookFile';


export class Book {
    id: number;

    title: string;

    description: string;

    image: string;

    price: number;

    publicationYear: number;

    isbn: string;

    categories?: Category[];

    authors?: Author[];

    bookFiles?: BookFile[];

    sales?: Sale[];

    bookRatings?: BookRating[];

    bookRatingStatistics?: BookRatingStatistic[];

    userCartItems?: UserCartItem[];

    bookViews?: BookView[];

    bookViewStatistics?: BookViewStatistic[];


    constructor(id?: number, title?: string, description?, image?: string, price?: number, publicationYear?: number, isbn?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
    }


    static assign(a: Book, b: Partial<Book>) {
        a.id = b.id;
        a.title = b.title;
        a.description = b.description;
        a.image = b.image;
        a.price = b.price;
        a.publicationYear = b.publicationYear;
        a.isbn = b.isbn;

        a.categories = b.categories !== undefined
            ? b.categories.map(b => Category.assign(new Category(), b))
            : undefined;
        a.authors = b.authors !== undefined
            ? b.authors.map(b => Author.assign(new Author(), b))
            : undefined;

        a.bookFiles = b.bookFiles !== undefined
            ? b.bookFiles.map(b => BookFile.assign(new BookFile(), b))
            : undefined;

        a.sales = b.sales !== undefined
            ? b.sales.map(b => Sale.assign(new Sale(), b))
            : undefined;

        a.bookRatings = b.bookRatings !== undefined
            ? b.bookRatings.map(b => BookRating.assign(new BookRating(), b))
            : undefined;

        a.bookRatingStatistics = b.bookRatingStatistics !== undefined
            ? b.bookRatingStatistics.map(b => BookRatingStatistic.assign(new BookRatingStatistic(), b))
            : undefined;

        a.userCartItems = b.userCartItems !== undefined
            ? b.userCartItems.map(b => UserCartItem.assign(new UserCartItem(), b))
            : undefined;

        a.bookViews = b.bookViews !== undefined
            ? b.bookViews.map(b => BookView.assign(new BookView(), b))
            : undefined;

        a.bookViewStatistics = b.bookViewStatistics !== undefined
            ? b.bookViewStatistics.map(b => BookViewStatistic.assign(new BookViewStatistic(), b))
            : undefined;

        return a;
    }
}
