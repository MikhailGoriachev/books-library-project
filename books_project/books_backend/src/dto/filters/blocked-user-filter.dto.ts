import { IsDate, IsInt, Min, Validate } from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class BlockedUserFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsInt()
    @Min(1)
    userId?: number;

    @IsDate()
    blockedAt?: Date;

    @IsDate()
    minBlockedAt?: Date;

    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minBlockedAt'])
    maxBlockedAt?: Date;

    @IsDate()
    unblockedAt?: Date;

    @IsDate()
    minUnblockedAt?: Date;

    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minUnblockedAt'])
    maxUnblockedAt?: Date;
}
