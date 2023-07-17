import {
    IsArray, IsDate,
    IsInt,
    IsNotEmpty, IsOptional,
    IsString, IsUrl, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Transform, Type } from 'class-transformer';

export class AuthorViewFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    userId?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    authorId?: number;

    @IsOptional()
    @Type(() => Date)
    // @Transform(({ value }) => new Date(value))
    @IsDate()
    viewedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    minViewedAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @Validate(LessThanOrEqualsValidator, ['minViewedAt'])
    @IsDate()
    maxViewedAt?: Date;
}
