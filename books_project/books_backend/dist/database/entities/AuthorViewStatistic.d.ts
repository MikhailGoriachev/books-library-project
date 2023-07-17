import { Relation } from 'typeorm';
import { Author } from './Author';
export declare class AuthorViewStatistic {
    id: number;
    author: Relation<Author>;
    amount: number;
    constructor(author?: Author, amount?: number);
}
