import { Relation } from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { BaseEntity } from './BaseEntity';
export declare class CategoryView extends BaseEntity {
    id: number;
    user: Relation<User>;
    category: Relation<Category>;
    viewedAt: Date;
    constructor(user?: User, category?: Category, viewedAt?: Date);
}
