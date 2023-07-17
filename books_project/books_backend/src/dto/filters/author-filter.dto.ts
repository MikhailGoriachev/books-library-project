import {
    IsArray,
    IsInt,
    IsNotEmpty, IsOptional,
    IsString, IsUrl, MaxLength,
    Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformStringToArrayNumber } from '../../infrastructure/utils';

export class AuthorFilterDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(0)
    id?: number;

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
    @IsArray()
    booksId?: number[];
}
