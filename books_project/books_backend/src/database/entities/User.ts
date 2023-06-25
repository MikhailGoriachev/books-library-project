import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, OneToOne, ManyToMany } from 'typeorm';
import { Sale } from './Sale';
import { AuthorView } from './AuthorView';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { CategoryView } from './CategoryView';
import { BlockedUser } from './BlockedUser';
import { Role } from './Role';
import { UserPassword } from './UserPassword';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @OneToMany(type => Sale, sale => sale.user)
    sales: Relation<Sale[]>;

    @OneToMany(type => BookRating, bookRating => bookRating.user)
    bookRatings: Relation<BookRating[]>;

    @OneToMany(type => UserCartItem, userCartItem => userCartItem.user)
    userCartItems: Relation<UserCartItem[]>;

    @OneToMany(type => BookView, bookView => bookView.user)
    bookViews: Relation<BookView[]>;

    @OneToMany(type => AuthorView, authorView => authorView.user)
    authorViews: Relation<AuthorView[]>;

    @OneToMany(type => CategoryView, categoryView => categoryView.user)
    categoryViews: Relation<CategoryView[]>;

    @OneToMany(type => BlockedUser, blockedUser => blockedUser.user)
    blockedUsers: Relation<BlockedUser>;

    @ManyToMany(type => Role, role => role.users)
    roles: Relation<Role[]>;

    @OneToOne(type => UserPassword, userPassword => userPassword.user, { cascade: true })
    userPassword: Relation<UserPassword>;


    constructor(name?: string, email?: string) {
        this.name = name;
        this.email = email;
    }
}
