import { Relation } from 'typeorm';
import { User } from './User';
export declare class BlockedUser {
    id: number;
    user: Relation<User>;
    blockedAt: Date;
    unblockedAt: Date;
    constructor(user?: User, blockedAt?: Date, unblockedAt?: Date);
}
