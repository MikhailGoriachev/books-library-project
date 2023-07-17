import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class CategoryViewStatistic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.categoryViewStatistics, { cascade: true })
    category: Relation<Category>;
    
    @Column({ type: 'int' })
    amount: number;


    constructor(category?: Category, amount?: number) {
        this.category = category;
        this.amount = amount;
    }
}
