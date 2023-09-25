import { Book } from './Book';
import { AuthorView } from './AuthorView';
import { AuthorViewStatistic } from './AuthorViewStatistic';
import { BaseEntity } from "./BaseEntity";

export class Author extends BaseEntity {
    id: number;

    name: string;

    description: string;

    detailsLink: string;

    image: string;

    books?: Book[];

    authorViews?: AuthorView[];

    authorViewStatistic?: AuthorViewStatistic;


    constructor(id?: number, name?: string, description?: string, detailsLink?: string, image?: string) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.detailsLink = detailsLink;
        this.image = image;
    }


    static assign(a: Author, b: Partial<Author>) {
        a.id = b.id;
        a.name = b.name;
        a.description = b.description;
        a.detailsLink = b.detailsLink;
        a.image = b.image;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.books = b.books !== undefined
            ? b.books.map(b => Book.assign(new Book(), b))
            : undefined;

        a.authorViews = b.authorViews !== undefined
            ? b.authorViews.map(b => AuthorView.assign(new AuthorView(), b))
            : undefined;

        a.authorViewStatistic = b.authorViewStatistic !== undefined
            ? AuthorViewStatistic.assign(new AuthorViewStatistic(), b.authorViewStatistic)
            : undefined;

        return a;
    }
}
