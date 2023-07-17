import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { Author } from './Author';

@Entity()
export class AuthorViewStatistic {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => Author, author => author.authorViewStatistics, { cascade: true })
    author: Relation<Author>;

    @Column({ type: 'int' })
    amount: number;


    constructor(author?: Author, amount?: number) {
        this.author = author;
        this.amount = amount;
    }
}