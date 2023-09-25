import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import { Author } from './Author';
import { BaseEntity } from './BaseEntity';

@Entity()
export class AuthorViewStatistic extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(type => Author, author => author.authorViewStatistic)
    @JoinColumn()
    author: Relation<Author>;

    @Column({ type: 'int' })
    amount: number;


    constructor(author?: Author, amount?: number) {
        super();
        this.author = author;
        this.amount = amount;
    }
}