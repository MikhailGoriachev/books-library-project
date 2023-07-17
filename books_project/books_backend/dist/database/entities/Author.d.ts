import { Relation } from 'typeorm';
import { Book } from './Book';
import { AuthorView } from './AuthorView';
import { AuthorViewStatistic } from './AuthorViewStatistic';
export declare class Author {
    id: number;
    name: string;
    description: string;
    detailsLink: string;
    image: string;
    books: Relation<Book[]>;
    authorViews: Relation<AuthorView[]>;
    authorViewStatistics: Relation<AuthorViewStatistic[]>;
    constructor(name?: string, description?: string, detailsLink?: string, image?: string);
}
