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
export class BookRating extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.bookRatings, { cascade: true })
    user: Relation<User>;

    @ManyToOne(type => Book, book => book.bookRatings, { cascade: true })
    book: Relation<Book>;

    @Column({ type: 'int' })
    value: number;


    constructor(user?: User, book?: Book, value?: number) {
        super();
        this.user = user;
        this.book = book;
        this.value = value;
    }
}
