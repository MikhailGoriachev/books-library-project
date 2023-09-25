import { Category } from './Category';
import { BaseEntity } from "./BaseEntity";


export class CategoryViewStatistic extends BaseEntity {
    id: number;

    categoryName?: Category;

    amount: number;


    constructor(id?: number, category?: Category, amount?: number) {
        super();
        this.id = id;
        this.categoryName = category;
        this.amount = amount;
    }


    static assign(a: CategoryViewStatistic, b: Partial<CategoryViewStatistic>) {
        a.id = b.id
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.categoryName = b.categoryName !== undefined
            ? Category.assign(new Category(), b.categoryName)
            : undefined;

        a.amount = b.amount;

        return a;
    }
}
