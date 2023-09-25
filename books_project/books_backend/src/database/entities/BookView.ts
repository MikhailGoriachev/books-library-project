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
export class BookView extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.bookViews, { cascade: true, nullable: true })
    user: Relation<User>;

    @ManyToOne(type => Book, book => book.bookViews, { cascade: true })
    book: Relation<Book>;

    @Column({ type: 'datetime' })
    viewedAt: Date;


    constructor(user?: User, book?: Book, viewedAt?: Date) {
        super();
        this.user = user;
        this.book = book;
        this.viewedAt = viewedAt;
    }
}
