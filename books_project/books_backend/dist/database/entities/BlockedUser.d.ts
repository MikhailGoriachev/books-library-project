import { Relation } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class BlockedUser extends BaseEntity {
    id: number;
    user: Relation<User>;
    blockedAt?: Date;
    unblockedAt?: Date;
    constructor(user?: User, blockedAt?: Date, unblockedAt?: Date);
}
