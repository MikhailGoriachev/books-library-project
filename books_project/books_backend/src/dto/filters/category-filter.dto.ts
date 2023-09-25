import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { transformStringToArrayNumber } from '../../infrastructure/utils';

export class CategoryFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
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
    @MaxLength(100)
    name?: string;
}
