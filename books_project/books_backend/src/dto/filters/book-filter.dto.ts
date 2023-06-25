import {
    IsArray,
    IsInt, IsISBN,
    IsNotEmpty, IsNumber,
    IsString, Max, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class BookFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title?: string;

    @IsString()
    @MaxLength(2000)
    description?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image?: string;

    @IsNumber()
    @Min(0)
    price?: number;

    @IsNumber()
    @Min(0)
    minPrice?: number;

    @IsNumber()
    @Min(0)
    @Validate(LessThanOrEqualsValidator, ['minPrice'])
    maxPrice?: number;

    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    publicationYear?: number;

    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    minPublicationYear?: number;

    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    @Validate(LessThanOrEqualsValidator, ['minPublicationYear'])
    maxPublicationYear?: number;

    @IsISBN()
    isbn?: string;

    @IsArray()
    categoriesId?: number[];

    @IsArray()
    authorsId?: number[];

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    authorName?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    categoryName?: string;
}
