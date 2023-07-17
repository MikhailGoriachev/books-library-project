import { Relation } from 'typeorm';
import { Book } from './Book';
export declare class BookRatingStatistic {
    id: number;
    book: Relation<Book>;
    value: number;
    amount: number;
    constructor(book?: Book, value?: number, amount?: number);
}
