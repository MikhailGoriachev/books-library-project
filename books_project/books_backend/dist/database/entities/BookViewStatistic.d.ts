import { Relation } from 'typeorm';
import { Book } from './Book';
import { BaseEntity } from './BaseEntity';
export declare class BookViewStatistic extends BaseEntity {
    id: number;
    book: Relation<Book>;
    amount: number;
    constructor(book?: Book, amount?: number);
}
