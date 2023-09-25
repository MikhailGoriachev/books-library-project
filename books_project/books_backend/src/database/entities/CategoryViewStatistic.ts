import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Category } from './Category';
import { BaseEntity } from './BaseEntity';

@Entity()
export class CategoryViewStatistic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Category, category => category.categoryViewStatistic)
    @JoinColumn()
    category: Relation<Category>;
    
    @Column({ type: 'int' })
    amount: number;


    constructor(category?: Category, amount?: number) {
        super();
        this.category = category;
        this.amount = amount;
    }
}
