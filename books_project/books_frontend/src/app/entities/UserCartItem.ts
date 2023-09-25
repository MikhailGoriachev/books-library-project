import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from "./BaseEntity";


export class UserCartItem extends BaseEntity {
    id: number;

    user?: User;

    book?: Book;


    constructor(id?: number, user?: User, book?: Book) {
        super();
        this.id = id;
        this.user = user;
        this.book = book;
    }


    static assign(a: UserCartItem, b: Partial<UserCartItem>) {
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

        return a;
    }
}
