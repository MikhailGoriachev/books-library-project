import { Book } from './Book';
import { User } from './User';


export class BookView {

    id: number;

    user?: User;

    book?: Book;

    viewedAt: Date;


    constructor(id?: number, user?: User, book?: Book, viewedAt?: Date) {
        this.id = id;
        this.user = user;
        this.book = book;
        this.viewedAt = viewedAt;
    }


    static assign(a: BookView, b: Partial<BookView>) {
        a.id = b.id

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
