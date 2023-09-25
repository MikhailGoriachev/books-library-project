import {
    IsArray,
    IsInt,
    IsISBN,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { transformStringToArrayNumber } from '../../../infrastructure/utils';

export class BookEditDto {
    @IsNumber()
    @Min(1)
    id: number;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title: string;
    
    @IsString()
    @MaxLength(2000)
    description: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image: string;
    
    @IsNumber()
    @Min(0)
    price: number;
    
    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    publicationYear: number;
    
    // @IsISBN()
    @IsString()
    isbn: string;
    
    @Transform(transformStringToArrayNumber)
    @IsArray()
    authorsId?: number[];
    
    @Transform(transformStringToArrayNumber)
    @IsArray()
    categoriesId?: number[];
}
