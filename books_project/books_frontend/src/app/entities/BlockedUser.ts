import { User } from './User';
import { Author } from "./Author";


export class BlockedUser {

    id: number;

    user?: User;

    blockedAt?: Date;

    unblockedAt?: Date;


    constructor(id?: number, user?: User, blockedAt?: Date, unblockedAt?: Date) {
        this.id = id;
        this.user = user;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
    }


    static assign(a: BlockedUser, b: Partial<BlockedUser>) {
        a.id = b.id;

        a.user = b.user !== undefined
            ? User.assign(new User(), b.user)
            : undefined;

        a.blockedAt = b.blockedAt;
        a.unblockedAt = b.unblockedAt;

        return a;
    }
}
