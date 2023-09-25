import {
    IsArray,
    IsInt,
    IsNotEmpty, IsOptional,
    IsString, IsUrl, MaxLength,
    Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformStringToArrayNumber } from '../../infrastructure/utils';
import { PageOptionsDto } from '../pagination/page-options.dto';

export class AuthorPaginationFilterDto extends PageOptionsDto {
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
