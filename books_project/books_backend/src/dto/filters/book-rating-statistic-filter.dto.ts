import { IsInt, IsOptional, Max, Min, Validate } from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Type } from 'class-transformer';

export class BookRatingStatisticFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    bookId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(5)
    value?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(5)
    minValue?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(5)
    @Validate(LessThanOrEqualsValidator, ['minValue'])
    maxValue?: number;
}
