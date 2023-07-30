import { Book } from './Book';
import { User } from "./User";


export class BookRatingStatistic {

    id: number;

    book?: Book;

    value: number;

    amount: number;


    constructor(id?: number, book?: Book, value?: number, amount?: number) {
        this.id = id;
        this.book = book;
        this.value = value;
        this.amount = amount;
    }


    static assign(a: BookRatingStatistic, b: Partial<BookRatingStatistic>) {
        a.id = b.id

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.value = b.value;
        a.amount = b.amount;
        
        return a;
    }
}
