import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, OneToMany } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';
import { BookFile } from './BookFile';
import { Sale } from './Sale';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 250 })
    title: string;

    @Column({ length: 2000 })
    description: string;

    @Column({ length: 255 })
    image: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'int' })
    publicationYear: number;

    @Column({ length: 20 })
    isbn: string;

    @ManyToMany(type => Category, category => category.books, { cascade: true })
    categories: Relation<Category[]>;

    @ManyToMany(type => Author, author => author.books, { cascade: true })
    authors: Relation<Author[]>;

    @OneToMany(type => BookFile, bookFile => bookFile.book)
    bookFiles: Relation<BookFile[]>;

    @OneToMany(type => Sale, sale => sale.book)
    sales: Relation<Sale[]>;

    @OneToMany(type => BookRating, bookRating => bookRating.book)
    bookRatings: Relation<BookRating[]>;

    @OneToMany(type => UserCartItem, userCartItem => userCartItem.book)
    userCartItems: Relation<UserCartItem[]>;

    @OneToMany(type => BookView, bookView => bookView.book)
    bookViews: Relation<BookView[]>;


    constructor(title?: string, description?, image?: string, price?: number, publicationYear?: number, isbn?: string) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.price = price;
        this.publicationYear = publicationYear;
        this.isbn = isbn;
    }
}
