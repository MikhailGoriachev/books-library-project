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
import { BaseEntity } from './BaseEntity';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ length: 255, default: '' })
    image: string;

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
    blockedUsers: Relation<BlockedUser[]>;

    @ManyToMany(type => Role, role => role.users)
    roles: Relation<Role[]>;

    @OneToOne(type => UserPassword, userPassword => userPassword.user, { cascade: true })
    userPassword: Relation<UserPassword>;

    get isBlocked(): boolean | null {
        return this.blockedUsers 
            ? this.blockedUsers.find(b => b.unblockedAt === null) !== undefined 
            : null;
    }
    

    constructor(name?: string, email?: string, image?: string) {
        super();
        this.name = name;
        this.email = email;
        this.image = image;
    }
}
