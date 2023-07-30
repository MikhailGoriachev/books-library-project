import { Book } from './Book';
import { User } from './User';


export class UserCartItem {
    id: number;

    user?: User;

    book?: Book;


    constructor(id?: number, user?: User, book?: Book) {
        this.id = id;
        this.user = user;
        this.book = book;
    }


    static assign(a: UserCartItem, b: Partial<UserCartItem>) {
        a.id = b.id

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        return a;
    }
}
