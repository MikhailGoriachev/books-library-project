import { Category } from './Category';
import { User } from "./User";


export class CategoryViewStatistic {
    id: number;

    category?: Category;

    amount: number;


    constructor(id?: number, category?: Category, amount?: number) {
        this.id = id;
        this.category = category;
        this.amount = amount;
    }


    static assign(a: CategoryViewStatistic, b: Partial<CategoryViewStatistic>) {
        a.id = b.id

        a.category = b.category !== undefined
            ? Category.assign(new Category(), b.category)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
