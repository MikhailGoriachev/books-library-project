import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
export declare class BookRating {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    value: number;
    constructor(user?: User, book?: Book, value?: number);
}
