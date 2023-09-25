import { Relation } from 'typeorm';
import { Book } from './Book';
import { CategoryView } from './CategoryView';
import { CategoryViewStatistic } from './CategoryViewStatistic';
import { BaseEntity } from './BaseEntity';
export declare class Category extends BaseEntity {
    id: number;
    name: string;
    books: Relation<Book[]>;
    categoryViews: Relation<CategoryView[]>;
    categoryViewStatistic: Relation<CategoryViewStatistic>;
    constructor(name?: string);
}
