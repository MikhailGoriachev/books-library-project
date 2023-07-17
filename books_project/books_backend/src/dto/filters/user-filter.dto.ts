import {
    IsEmail, IsInt,
    IsNotEmpty, IsOptional,
    IsString,
    MaxLength, Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsEmail()
    @MaxLength(255)
    email?: string;
}
