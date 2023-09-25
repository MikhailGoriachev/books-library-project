import { Relation } from 'typeorm';
import { Author } from './Author';
import { BaseEntity } from './BaseEntity';
export declare class AuthorViewStatistic extends BaseEntity {
    id: number;
    author: Relation<Author>;
    amount: number;
    constructor(author?: Author, amount?: number);
}
