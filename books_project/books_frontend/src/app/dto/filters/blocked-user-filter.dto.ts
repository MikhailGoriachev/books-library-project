export class BlockedUserFilterDto {
    constructor(public id?: number,
                public userId?: number,
                public blockedAt?: Date,
                public minBlockedAt?: Date,
                public maxBlockedAt?: Date,
                public unblockedAt?: Date,
                public minUnblockedAt?: Date,
                public maxUnblockedAt?: Date) {}
}
