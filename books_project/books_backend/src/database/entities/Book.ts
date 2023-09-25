import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, OneToMany, OneToOne } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';
import { BookFile } from './BookFile';
import { Sale } from './Sale';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { BookRatingStatistic } from './BookRatingStatistic';
import { BookViewStatistic } from './BookViewStatistic';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    title: string;

    @Column({ length: 2000 })
    description: string;

    @Column({ length: 255, default: '' })
    image: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    publicationYear: number;

    @Column({ length: 20 })
    isbn: string;

    @ManyToMany(type => Category, category => category.books)
    categories: Relation<Category[]>;

    @ManyToMany(type => Author, author => author.books)
    authors: Relation<Author[]>;

    @OneToMany(type => BookFile, bookFile => bookFile.book)
    bookFiles: Relation<BookFile[]>;

    @OneToMany(type => Sale, sale => sale.book)
    sales: Relation<Sale[]>;

    @OneToMany(type => BookRating, bookRating => bookRating.book)
    bookRatings: Relation<BookRating[]>;

    // @OneToMany(type => BookRatingStatistic, BookRatingStatistic => BookRatingStatistic.book)
    // bookRatingStatistics: Relation<BookRatingStatistic[]>;

    @OneToOne(type => BookRatingStatistic, BookRatingStatistic => BookRatingStatistic.book)
    bookRatingStatistic: Relation<BookRatingStatistic>;

    @OneToMany(type => UserCartItem, userCartItem => userCartItem.book)
    userCartItems: Relation<UserCartItem[]>;

    @OneToMany(type => BookView, bookView => bookView.book)
    bookViews: Relation<BookView[]>;

    // @OneToMany(type => BookViewStatistic, bookViewStatistic => bookViewStatistic.book)
    // bookViewStatistics: Relation<BookViewStatistic[]>;
    @OneToOne(type => BookViewStatistic, bookViewStatistic => bookViewStatistic.book)
    bookViewStatistic: Relation<BookViewStatistic>;


    constructor(title?: string, description?: string, image?: string, price?: number, publicationYear?: number, isbn?: string) {
        super();
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
    }
}
