import {
    IsArray,
    IsInt, IsISBN,
    IsNotEmpty, IsNumber, IsOptional,
    IsString, Max, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Transform, Type } from 'class-transformer';
import { transformStringToArrayNumber } from '../../infrastructure/utils';
import { PageOptionsDto } from '../pagination/page-options.dto';

export class BookPaginationFilterDto extends PageOptionsDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    description?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Validate(LessThanOrEqualsValidator, ['minPrice'])
    maxPrice?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    publicationYear?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    minPublicationYear?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    @Validate(LessThanOrEqualsValidator, ['minPublicationYear'])
    maxPublicationYear?: number;

    @IsOptional()
    // @IsISBN(13)
    @IsString()
    isbn?: string;

    @IsOptional()
    @Transform(transformStringToArrayNumber)
    @IsArray()
    categoriesId?: number[];

    @IsOptional()
    @Transform(transformStringToArrayNumber)
    @IsArray()
    authorsId?: number[];

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    authorName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    categoryName?: string;
}
