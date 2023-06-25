import {
    IsArray, IsDate,
    IsInt,
    IsNotEmpty,
    IsString, IsUrl, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class AuthorViewFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsInt()
    @Min(0)
    userId?: number;

    @IsInt()
    @Min(1)
    authorId?: number;

    @IsDate()
    viewedAt?: Date;

    @IsDate()
    minViewedAt?: Date;

    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minViewedAt'])
    maxViewedAt?: Date;
}
