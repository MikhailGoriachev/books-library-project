import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
export declare class Sale {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    price: number;
    saleAt: Date;
    constructor(user?: User, book?: Book, price?: number, saleAt?: Date);
}
