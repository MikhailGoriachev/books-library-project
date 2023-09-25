import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne, JoinColumn,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BookViewStatistic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    // @ManyToOne(type => Book, book => book.bookViewStatistics, { cascade: true })
    @ManyToOne(type => Book, book => book.bookViewStatistic)
    @JoinColumn()
    book: Relation<Book>;
    
    @Column({ type: 'int' })
    amount: number;


    constructor(book?: Book, amount?: number) {
        super();
        this.book = book;
        this.amount = amount;
    }
}
