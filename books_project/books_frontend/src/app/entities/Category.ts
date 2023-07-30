import { Book } from './Book';
import { CategoryView } from './CategoryView';
import { CategoryViewStatistic } from './CategoryViewStatistic';


export class Category {
    id: number;

    name: string;

    books?: Book[];

    categoryViews?: CategoryView[];

    categoryViewStatistics?: CategoryViewStatistic[];

    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }


    static assign(a: Category, b: Partial<Category>) {
        a.id = b.id
        a.name = b.name;

        return a;
    }
}
