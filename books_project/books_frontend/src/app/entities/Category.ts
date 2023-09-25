import { Book } from './Book';
import { CategoryView } from './CategoryView';
import { CategoryViewStatistic } from './CategoryViewStatistic';
import { BaseEntity } from "./BaseEntity";


export class Category extends BaseEntity {
    id: number;

    name: string;

    books?: Book[];

    categoryViews?: CategoryView[];

    categoryViewStatistic?: CategoryViewStatistic;

    constructor(id?: number, name?: string) {
        super();
        this.id = id;
        this.name = name;
    }


    static assign(a: Category, b: Partial<Category>) {
        a.id = b.id
        a.name = b.name;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.categoryViews = b.categoryViews !== undefined
            ? b.categoryViews.map(b => CategoryView.assign(new CategoryView(), b))
            : undefined;


        a.categoryViewStatistic = b.categoryViewStatistic !== undefined
            ? CategoryViewStatistic.assign(new CategoryViewStatistic(), b)
            : undefined;

        return a;
    }
}
