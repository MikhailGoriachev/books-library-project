import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from "./BaseEntity";


export class Sale extends BaseEntity {
    id: number;

    user?: User;

    book?: Book;

    price: number;

    saleAt: Date;


    constructor(id?: number, user?: User, book?: Book, price?: number, saleAt?: Date) {
        super();
        this.id = id;
        this.user = user;
        this.book = book;
        this.price = price;
        this.saleAt = saleAt;
    }


    static assign(a: Sale, b: Partial<Sale>) {
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

        a.price = b.price;
        a.saleAt = new Date(b.saleAt);

        return a;
    }
}
