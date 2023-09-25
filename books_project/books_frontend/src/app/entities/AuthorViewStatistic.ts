import { Author } from './Author';
import { User } from "./User";
import { BaseEntity } from "./BaseEntity";


export class AuthorViewStatistic extends BaseEntity {
    id: number;

    author?: Author;

    amount: number;


    constructor(id?: number, author?: Author, amount?: number) {
        super();
        this.id = id;
        this.author = author;
        this.amount = amount;
    }


    static assign(a: AuthorViewStatistic, b: Partial<AuthorViewStatistic>) {
        a.id = b.id;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.author = b.author !== undefined
            ? Author.assign(new Author(), b.author)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
