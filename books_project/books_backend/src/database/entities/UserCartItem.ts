import {
    Entity,
    PrimaryGeneratedColumn,
    Relation,
    ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class UserCartItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.userCartItems)
    user: Relation<User>;

    @ManyToOne(type => Book, book => book.userCartItems)
    book: Relation<Book>;


    constructor(user?: User, book?: Book) {
        super();
        this.user = user;
        this.book = book;
    }
}
