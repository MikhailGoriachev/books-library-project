import { User } from './User';
import { Author } from "./Author";
import { BaseEntity } from "./BaseEntity";


export class BlockedUser extends BaseEntity {

    id: number;

    user?: User;

    blockedAt?: Date;

    unblockedAt?: Date;


    constructor(id?: number, user?: User, blockedAt?: Date, unblockedAt?: Date) {
        super();
        this.id = id;
        this.user = user;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
    }


    static assign(a: BlockedUser, b: Partial<BlockedUser>) {
        a.id = b.id;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.blockedAt = b.blockedAt;
        a.unblockedAt = b.unblockedAt;

        return a;
    }
}
