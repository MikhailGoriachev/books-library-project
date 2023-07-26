import { Relation } from 'typeorm';
import { User } from './User';
import { Category } from './Category';
export declare class CategoryView {
    id: number;
    user: Relation<User>;
    category: Relation<Category>;
    viewedAt: Date;
    constructor(user?: User, category?: Category, viewedAt?: Date);
}
