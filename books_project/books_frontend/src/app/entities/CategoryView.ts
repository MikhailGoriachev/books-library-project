import { User } from './User';
import { Category } from './Category';
import { Book } from "./Book";


export class CategoryView {
    id: number;

    user?: User;

    category?: Category;

    viewedAt: Date;


    constructor(id?: number, user?: User, category?: Category, viewedAt?: Date) {
        this.id = id;
        this.user = user;
        this.category = category;
        this.viewedAt = viewedAt;
    }


    static assign(a: CategoryView, b: Partial<CategoryView>) {
        a.id = b.id

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.category = b.category !== undefined
            ? Category.assign(new Category(), b.category)
            : undefined;

        a.viewedAt = new Date(b.viewedAt);

        return a;
    }
}
