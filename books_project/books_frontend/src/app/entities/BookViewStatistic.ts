import { Book } from './Book';

export class BookViewStatistic {
    id: number;

    book?: Book;

    amount: number;


    constructor(id?: number, book?: Book, amount?: number) {
        this.id = id;
        this.book = book;
        this.amount = amount;
    }


    static assign(a: BookViewStatistic, b: Partial<BookViewStatistic>) {
        a.id = b.id

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
