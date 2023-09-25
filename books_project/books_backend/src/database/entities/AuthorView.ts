import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Author } from './Author';
import { BaseEntity } from './BaseEntity';

@Entity()
export class AuthorView extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.authorViews, { cascade: true })
    user: Relation<User>;
    
    @ManyToOne(type => Author, author => author.authorViewStatistic, { cascade: true })
    author: Relation<Author>;

    @Column({ type: 'datetime' })
    viewedAt: Date;


    constructor(user?: User, author?: Author, viewedAt?: Date) {
        super();
        this.user = user;
        this.author = author;
        this.viewedAt = viewedAt;
    }
}
