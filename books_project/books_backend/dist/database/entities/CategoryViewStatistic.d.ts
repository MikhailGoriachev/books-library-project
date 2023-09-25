import { Relation } from 'typeorm';
import { Category } from './Category';
import { BaseEntity } from './BaseEntity';
export declare class CategoryViewStatistic extends BaseEntity {
    id: number;
    category: Relation<Category>;
    amount: number;
    constructor(category?: Category, amount?: number);
}
