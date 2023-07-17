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
export class BookRatingStatistic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Book, book => book.bookRatingStatistics, { cascade: true })
    book: Relation<Book>;

    @Column({ type: 'float' })
    value: number;

    @Column({ type: 'int' })
    amount: number;


    constructor(book?: Book, value?: number, amount?: number) {
        this.book = book;
        this.value = value;
        this.amount = amount;
    }
}
