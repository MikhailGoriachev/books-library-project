import { IsInt, Max, Min, Validate } from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class BookRatingFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsInt()
    @Min(1)
    userId?: number;

    @IsInt()
    @Min(1)
    bookId?: number;

    @IsInt()
    @Min(1)
    @Max(5)
    value?: number;

    @IsInt()
    @Min(1)
    @Max(5)
    minValue?: number;

    @IsInt()
    @Min(1)
    @Max(5)
    @Validate(LessThanOrEqualsValidator, ['minValue'])
    maxValue?: number;
}
