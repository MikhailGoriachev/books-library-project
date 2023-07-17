import { Relation } from 'typeorm';
import { Category } from './Category';
export declare class CategoryViewStatistic {
    id: number;
    category: Relation<Category>;
    amount: number;
    constructor(category?: Category, amount?: number);
}
