import { Book } from './Book';
import { User } from './User';
import { Category } from "./Category";


export class Sale {
    id: number;

    user?: User;

    book?: Book;

    price: number;

    saleAt: Date;


    constructor(id?: number, user?: User, book?: Book, price?: number, saleAt?: Date) {
        this.id = id;
        this.user = user;
        this.book = book;
        this.price = price;
        this.saleAt = saleAt;
    }


    static assign(a: Sale, b: Partial<Sale>) {
        a.id = b.id

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.price = b.price;
        a.saleAt = new Date(b.saleAt);

        return a;
    }
}
