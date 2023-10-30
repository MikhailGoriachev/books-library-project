import {
    IsArray, IsDate,
    IsInt,
    IsNotEmpty, IsOptional,
    IsString, IsUrl, MaxLength,
    Min, Validate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformStringToArrayNumber } from '../../../infrastructure/utils';
import { LessThanOrEqualsValidator } from '../../../validators/less-than-or-equals.validator';

export class AuthorReportFilterDto {
    @IsDate()
    @Type(() => Date)
    begin?: Date;

    @IsDate()
    @Type(() => Date)
    @Validate(LessThanOrEqualsValidator, ['begin'])
    end?: Date;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    id?: number;

    @IsOptional()
    @Transform(transformStringToArrayNumber)
    @Type(() => Array<Number>)
    @IsArray()
    ids?: number[];

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    @MaxLength(512)
    detailsLink?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image?: string;

    @IsOptional()
    @Transform(transformStringToArrayNumber)
    @Type(() => Array<Number>)
    @IsArray()
    booksId?: number[];
}
