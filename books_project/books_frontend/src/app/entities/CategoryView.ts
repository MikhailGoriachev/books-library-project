import { User } from './User';
import { Category } from './Category';
import { BaseEntity } from "./BaseEntity";


export class CategoryView extends BaseEntity {
    id: number;

    user?: User;

    categoryName?: Category;

    viewedAt: Date;


    constructor(id?: number, user?: User, category?: Category, viewedAt?: Date) {
        super();
        this.id = id;
        this.user = user;
        this.categoryName = category;
        this.viewedAt = viewedAt;
    }


    static assign(a: CategoryView, b: Partial<CategoryView>) {
        a.id = b.id
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.categoryName = b.categoryName !== undefined
            ? Category.assign(new Category(), b.categoryName)
            : undefined;

        a.viewedAt = new Date(b.viewedAt);

        return a;
    }
}
