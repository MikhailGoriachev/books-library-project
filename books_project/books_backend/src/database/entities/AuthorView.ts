import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Author } from './Author';

@Entity()
export class AuthorView {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.authorViews, { cascade: true })
    user: Relation<User>;

    @ManyToOne(type => Author, author => author.authorViews, { cascade: true })
    author: Relation<Author>;

    @Column({ type: 'datetime' })
    viewedAt: Date;


    constructor(user?: User, author?: Author, viewedAt?: Date) {
        this.user = user;
        this.author = author;
        this.viewedAt = viewedAt;
    }
}
