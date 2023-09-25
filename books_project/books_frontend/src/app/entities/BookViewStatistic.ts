import { Book } from './Book';
import { BaseEntity } from "./BaseEntity";

export class BookViewStatistic extends BaseEntity {
    id: number;

    book?: Book;

    amount: number;


    constructor(id?: number, book?: Book, amount?: number) {
        super();
        this.id = id;
        this.book = book;
        this.amount = amount;
    }


    static assign(a: BookViewStatistic, b: Partial<BookViewStatistic>) {
        a.id = b.id
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
