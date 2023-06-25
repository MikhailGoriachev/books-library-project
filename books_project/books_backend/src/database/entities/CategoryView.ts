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
export class CategoryView {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.categoryViews, { cascade: true })
    user: Relation<User>;

    @ManyToOne(type => Category, category => category.categoryViews, { cascade: true })
    category: Relation<Category>;

    @Column({ type: 'datetime' })
    viewedAt: Date;


    constructor(user?: User, category?: Category, viewedAt?: Date) {
        this.user = user;
        this.category = category;
        this.viewedAt = viewedAt;
    }
}
