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
export declare class User {
    id: number;
    name: string;
    email: string;
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
    constructor(name?: string, email?: string);
}
