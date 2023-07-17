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
export class BookViewStatistic {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Book, book => book.bookViewStatistics, { cascade: true })
    book: Relation<Book>;
    
    @Column({ type: 'int' })
    amount: number;


    constructor(book?: Book, amount?: number) {
        this.book = book;
        this.amount = amount;
    }
}
