import { Relation } from 'typeorm';
import { Book } from './Book';
import { CategoryView } from './CategoryView';
import { CategoryViewStatistic } from './CategoryViewStatistic';
export declare class Category {
    id: number;
    name: string;
    books: Relation<Book[]>;
    categoryViews: Relation<CategoryView[]>;
    categoryViewStatistics: Relation<CategoryViewStatistic[]>;
    constructor(name?: string);
}
