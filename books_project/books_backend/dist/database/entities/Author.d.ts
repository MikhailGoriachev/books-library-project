import { Relation } from 'typeorm';
import { Book } from './Book';
import { AuthorView } from './AuthorView';
import { AuthorViewStatistic } from './AuthorViewStatistic';
import { BaseEntity } from './BaseEntity';
export declare class Author extends BaseEntity {
    id: number;
    name: string;
    description: string;
    detailsLink: string;
    image: string;
    books: Relation<Book[]>;
    authorViews: Relation<AuthorView[]>;
    authorViewStatistic: Relation<AuthorViewStatistic>;
    constructor(name?: string, description?: string, detailsLink?: string, image?: string);
}
