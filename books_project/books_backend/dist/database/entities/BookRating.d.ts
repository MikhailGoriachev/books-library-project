import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class BookRating extends BaseEntity {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    value: number;
    constructor(user?: User, book?: Book, value?: number);
}
