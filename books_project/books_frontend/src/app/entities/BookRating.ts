import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from "./BaseEntity";


export class BookRating extends BaseEntity {

    id: number;

    user?: User;

    book?: Book;

    value: number;


    constructor(id?: number, user?: User, book?: Book, value?: number) {
        super();
        this.id = id;
        this.user = user;
        this.book = book;
        this.value = value;
    }


    static assign(a: BookRating, b: Partial<BookRating>) {
        a.id = b.id
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.value = b.value;

        return a;
    }
}
