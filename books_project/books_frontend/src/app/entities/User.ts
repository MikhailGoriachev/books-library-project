import { Sale } from './Sale';
import { AuthorView } from './AuthorView';
import { BookRating } from './BookRating';
import { UserCartItem } from './UserCartItem';
import { BookView } from './BookView';
import { CategoryView } from './CategoryView';
import { BlockedUser } from './BlockedUser';
import { Role } from './Role';
import { BaseEntity } from "./BaseEntity";


export class User extends BaseEntity {
    id: number;

    name: string;

    email: string;

    image: string;

    sales?: Sale[];

    bookRatings?: BookRating[];

    userCartItems?: UserCartItem[];

    bookViews?: BookView[];

    authorViews?: AuthorView[];

    categoryViews?: CategoryView[];

    blockedUsers?: BlockedUser[];

    roles?: Role[];

    get isBlocked(): boolean | null {
        return this.blockedUsers
            ? this.blockedUsers.find(b => b.unblockedAt === null) !== undefined
            : null;
    }

    get isAdmin(): boolean | null {
        return this.roles
            ? this.roles.find(r => r.name === 'admin') !== undefined
            : null;
    }


    constructor(id?: number, name?: string, email?: string) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
    }


    static assign(a: User, b: Partial<User>) {
        a.id = b.id

        a.name = b.name;
        a.email = b.email;
        a.image = b.image;

        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.sales = b.sales !== undefined
            ? b.sales.map(u => Sale.assign(new Sale(), u))
            : undefined;

        a.bookRatings = b.bookRatings !== undefined
            ? b.bookRatings.map(u => BookRating.assign(new BookRating(), u))
            : undefined;

        a.userCartItems = b.userCartItems !== undefined
            ? b.userCartItems.map(u => UserCartItem.assign(new UserCartItem(), u))
            : undefined;

        a.bookViews = b.bookViews !== undefined
            ? b.bookViews.map(u => BookView.assign(new BookView(), u))
            : undefined;

        a.authorViews = b.authorViews !== undefined
            ? b.authorViews.map(u => AuthorView.assign(new AuthorView(), u))
            : undefined;

        a.categoryViews = b.categoryViews !== undefined
            ? b.categoryViews.map(u => CategoryView.assign(new CategoryView(), u))
            : undefined;

        a.blockedUsers = b.blockedUsers !== undefined
            ? b.blockedUsers.map(u => BlockedUser.assign(new BlockedUser(), u))
            : undefined;

        a.roles = b.roles !== undefined
            ? b.roles.map(u => Role.assign(new Role(), u))
            : undefined;

        return a;
    }
}
