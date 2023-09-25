import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BookRatingStatistic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(type => Book, book => book.bookRatingStatistics, { cascade: true })
    @OneToOne(type => Book, book => book.bookRatingStatistic)
    @JoinColumn()
    book: Relation<Book>;

    @Column({ type: 'float' })
    value: number;

    @Column({ type: 'int' })
    amount: number;


    constructor(book?: Book, value?: number, amount?: number) {
        super();
        this.book = book;
        this.value = value;
        this.amount = amount;
    }
}
