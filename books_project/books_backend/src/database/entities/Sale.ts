import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Sale {
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
        this.user = user;
        this.book = book;
        this.price = price;
        this.saleAt = saleAt;
    }
}
