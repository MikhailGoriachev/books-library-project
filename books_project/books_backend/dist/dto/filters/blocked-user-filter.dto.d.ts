import { FindOperator } from 'typeorm';
export declare class BlockedUserFilterDto {
    id?: number;
    userId?: number;
    blockedAt?: Date;
    minBlockedAt?: Date;
    maxBlockedAt?: Date;
    unblockedAt?: Date | FindOperator<any>;
    minUnblockedAt?: Date;
    maxUnblockedAt?: Date;
}
