import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from "./BaseEntity";


export class BookView extends BaseEntity {

    id: number;

    user?: User;

    book?: Book;

    viewedAt: Date;


    constructor(id?: number, user?: User, book?: Book, viewedAt?: Date) {
        super();
        this.id = id;
        this.user = user;
        this.book = book;
        this.viewedAt = viewedAt;
    }


    static assign(a: BookView, b: Partial<BookView>) {
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

        a.viewedAt = new Date(b.viewedAt);

        return a;
    }
}
