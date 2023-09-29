import {
    IsEmail, IsInt,
    IsNotEmpty, IsOptional,
    IsString,
    MaxLength, Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PageOptionsDto } from '../pagination/page-options.dto';

export class UserPaginationFilterDto extends PageOptionsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
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
}
