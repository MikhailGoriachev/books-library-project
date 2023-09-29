import { IsDate, IsInt, IsOptional, Min, Validate } from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Type } from 'class-transformer';
import { FindOperator } from 'typeorm';

export class BlockedUserFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    userId?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    blockedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    minBlockedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minBlockedAt'])
    maxBlockedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    unblockedAt?: Date | FindOperator<any>;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    minUnblockedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minUnblockedAt'])
    maxUnblockedAt?: Date;
}
