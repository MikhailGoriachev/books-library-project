import { IsDate, IsInt, IsOptional, Min, Validate } from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Type } from 'class-transformer';

export class BookViewFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    userId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    bookId?: number;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    viewedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    minViewedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minViewedAt'])
    maxViewedAt?: Date;
}
