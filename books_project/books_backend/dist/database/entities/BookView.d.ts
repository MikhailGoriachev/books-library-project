import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
export declare class BookView {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    viewedAt: Date;
    constructor(user?: User, book?: Book, viewedAt?: Date);
}
