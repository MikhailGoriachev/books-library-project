import { Relation } from 'typeorm';
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
export declare class User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    image: string;
    sales: Relation<Sale[]>;
    bookRatings: Relation<BookRating[]>;
    userCartItems: Relation<UserCartItem[]>;
    bookViews: Relation<BookView[]>;
    authorViews: Relation<AuthorView[]>;
    categoryViews: Relation<CategoryView[]>;
    blockedUsers: Relation<BlockedUser[]>;
    roles: Relation<Role[]>;
    userPassword: Relation<UserPassword>;
    get isBlocked(): boolean | null;
    constructor(name?: string, email?: string, image?: string);
}
