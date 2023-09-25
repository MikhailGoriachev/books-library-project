import { Relation } from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class UserCartItem extends BaseEntity {
    id: number;
    user: Relation<User>;
    book: Relation<Book>;
    constructor(user?: User, book?: Book);
}
