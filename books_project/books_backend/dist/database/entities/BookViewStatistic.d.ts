import { Relation } from 'typeorm';
import { Book } from './Book';
export declare class BookViewStatistic {
    id: number;
    book: Relation<Book>;
    amount: number;
    constructor(book?: Book, amount?: number);
}
