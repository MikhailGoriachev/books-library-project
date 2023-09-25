import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class BookView extends BaseEntity {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    viewedAt: Date;
    constructor(user?: User, book?: Book, viewedAt?: Date);
}
