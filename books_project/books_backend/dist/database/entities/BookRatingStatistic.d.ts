import { Relation } from 'typeorm';
import { Book } from './Book';
import { BaseEntity } from './BaseEntity';
export declare class BookRatingStatistic extends BaseEntity {
    id: number;
    book: Relation<Book>;
    value: number;
    amount: number;
    constructor(book?: Book, value?: number, amount?: number);
}
