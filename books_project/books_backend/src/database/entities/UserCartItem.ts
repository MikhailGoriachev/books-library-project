import {
    Entity,
    PrimaryGeneratedColumn,
    Relation,
    ManyToOne,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class UserCartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.userCartItems, { cascade: true })
    user: Relation<User>;

    @ManyToOne(type => Book, book => book.userCartItems, { cascade: true })
    book: Relation<Book>;


    constructor(user?: User, book?: Book) {
        this.user = user;
        this.book = book;
    }
}
