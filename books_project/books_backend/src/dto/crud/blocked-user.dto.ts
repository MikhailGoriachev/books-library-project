import { IsDate, IsInt, Min } from 'class-validator';

export class BlockedUserDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(1)
    userId: number;

    @IsDate()
    blockedAt: Date;

    @IsDate()
    unblockedAt?: Date;
}
