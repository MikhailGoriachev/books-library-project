import { Book } from './Book';
import { BaseEntity } from "./BaseEntity";


export class BookRatingStatistic extends BaseEntity {

    id: number;

    book?: Book;

    value: number;

    amount: number;


    constructor(id?: number, book?: Book, value?: number, amount?: number) {
        super();
        this.id = id;
        this.book = book;
        this.value = value;
        this.amount = amount;
    }


    static assign(a: BookRatingStatistic, b: Partial<BookRatingStatistic>) {
        a.id = b.id
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.book = b.book !== undefined
            ? Book.assign(new Book(), b.book)
            : undefined;

        a.value = b.value;
        a.amount = b.amount;

        return a;
    }
}
