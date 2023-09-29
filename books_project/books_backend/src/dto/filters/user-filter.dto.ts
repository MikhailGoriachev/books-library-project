import {
    IsEmail, IsInt,
    IsNotEmpty, IsOptional,
    IsString,
    MaxLength, Min, Type
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    email?: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    image?: string;
}
