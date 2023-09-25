import { User } from './User';
import { Author } from './Author';
import { Book } from "./Book";
import { AuthorViewStatistic } from "./AuthorViewStatistic";
import { BaseEntity } from "./BaseEntity";


export class AuthorView extends BaseEntity{

    id: number;

    user?: User;

    author?: Author;

    viewedAt: Date;


    constructor(id?: number, user?: User, author?: Author, viewedAt?: Date) {
        super();
        this.id = id;
        this.user = user;
        this.author = author;
        this.viewedAt = viewedAt;
    }


    static assign(a: AuthorView, b: Partial<AuthorView>) {
        a.id = b.id;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.author = b.author !== undefined
            ? Author.assign(new Author(), b.author)
            : undefined;

        a.viewedAt = new Date(b.viewedAt);

        return a;
    }
}
