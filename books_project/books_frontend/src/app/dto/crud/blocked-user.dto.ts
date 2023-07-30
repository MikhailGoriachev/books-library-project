export class BlockedUserDto {
    constructor(public id: number,
                public userId: number,
                public blockedAt: Date,
                public unblockedAt?: Date) {
    }

}
