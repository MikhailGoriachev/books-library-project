import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
export declare class UserCartItem {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    constructor(user?: User, book?: Book);
}
