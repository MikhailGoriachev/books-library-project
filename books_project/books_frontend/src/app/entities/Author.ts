import { Book } from './Book';
import { AuthorView } from './AuthorView';
import { AuthorViewStatistic } from './AuthorViewStatistic';

export class Author {
    id: number;

    name: string;

    description: string;

    detailsLink: string;

    image: string;

    books?: Book[];

    authorViews?: AuthorView[];

    authorViewStatistics?: AuthorViewStatistic[];


    constructor(id?: number, name?: string, description?: string, detailsLink?: string, image?: string) {
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

        a.books = b.books !== undefined
            ? b.books.map(b => Book.assign(new Book(), b))
            : undefined;

        a.authorViews = b.authorViews !== undefined
            ? b.authorViews.map(b => AuthorView.assign(new AuthorView(), b))
            : undefined;

        a.authorViewStatistics = b.authorViewStatistics !== undefined
            ? b.authorViewStatistics.map(b => AuthorViewStatistic.assign(new AuthorViewStatistic(), b))
            : undefined;

        return a;
    }
}
