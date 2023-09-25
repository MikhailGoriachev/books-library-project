import { Relation } from 'typeorm';
import { User } from './User';
import { Author } from './Author';
import { BaseEntity } from './BaseEntity';
export declare class AuthorView extends BaseEntity {
    id: number;
    user: Relation<User>;
    author: Relation<Author>;
    viewedAt: Date;
    constructor(user?: User, author?: Author, viewedAt?: Date);
}
