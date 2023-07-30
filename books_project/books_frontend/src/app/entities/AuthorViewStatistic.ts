import { Author } from './Author';
import { User } from "./User";


export class AuthorViewStatistic {
    id: number;

    author?: Author;

    amount: number;


    constructor(id?: number, author?: Author, amount?: number) {
        this.id = id;
        this.author = author;
        this.amount = amount;
    }


    static assign(a: AuthorViewStatistic, b: Partial<AuthorViewStatistic>) {
        a.id = b.id;

        a.author = b.author !== undefined
            ? Author.assign(new Author(), b.author)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
