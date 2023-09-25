
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Sale extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.sales, { cascade: true })
    user: Relation<User>;

    @ManyToOne(type => Book, book => book.sales, { cascade: true })
    book: Relation<Book>;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'datetime' })
    saleAt: Date;


    constructor(user?: User, book?: Book, price?: number, saleAt?: Date) {
        super();
        this.user = user;
        this.book = book;
        this.price = price;
        this.saleAt = saleAt;
    }
}
