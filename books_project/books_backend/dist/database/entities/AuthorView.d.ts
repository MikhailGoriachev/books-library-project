import { Relation } from 'typeorm';
import { User } from './User';
import { Author } from './Author';
export declare class AuthorView {
    id: number;
    user: Relation<User>;
    author: Relation<Author>;
    viewedAt: Date;
    constructor(user?: User, author?: Author, viewedAt?: Date);
}
