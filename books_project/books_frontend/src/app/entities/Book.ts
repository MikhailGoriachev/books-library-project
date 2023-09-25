import { Category } from './Category';
import { Author } from './Author';
import { Sale } from './Sale';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { BookRatingStatistic } from './BookRatingStatistic';
import { BookViewStatistic } from './BookViewStatistic';
import { BookFile } from './BookFile';
import { BaseEntity } from "./BaseEntity";


export class Book extends BaseEntity {
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

    bookRatingStatistic?: BookRatingStatistic;

    userCartItems?: UserCartItem[];

    bookViews?: BookView[];

    bookViewStatistic?: BookViewStatistic;


    constructor(
        id?: number,
        title?: string,
        description?: string,
        image?: string,
        price?: number,
        publicationYear?: number,
        isbn?: string
    ) {
        super();
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
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.categories = b.categories !== undefined
            ? b.categories.map(c => Category.assign(new Category(), c))
            : undefined;
        a.authors = b.authors !== undefined
            ? b.authors.map(a => Author.assign(new Author(), a))
            : undefined;

        a.bookFiles = b.bookFiles !== undefined
            ? b.bookFiles.map(b => BookFile.assign(new BookFile(), b))
            : undefined;

        a.sales = b.sales !== undefined
            ? b.sales.map(s => Sale.assign(new Sale(), s))
            : undefined;

        a.bookRatings = b.bookRatings !== undefined
            ? b.bookRatings.map(b => BookRating.assign(new BookRating(), b))
            : undefined;

        a.bookRatingStatistic = b.bookRatingStatistic !== undefined
            ? BookRatingStatistic.assign(new BookRatingStatistic(), b.bookRatingStatistic)
            : undefined;

        a.userCartItems = b.userCartItems !== undefined
            ? b.userCartItems.map(b => UserCartItem.assign(new UserCartItem(), b))
            : undefined;

        a.bookViews = b.bookViews !== undefined
            ? b.bookViews.map(b => BookView.assign(new BookView(), b))
            : undefined;

        // console.log(b.id);

        a.bookViewStatistic = b.bookViewStatistic
            ? BookViewStatistic.assign(new BookViewStatistic(), b.bookViewStatistic)
            : undefined;

        return a;
    }
}
