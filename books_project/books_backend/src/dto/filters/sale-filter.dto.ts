import {
    IsArray, IsDate,
    IsInt, IsISBN,
    IsNotEmpty, IsNumber, IsOptional,
    IsString, Max, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';
import { Type } from 'class-transformer';

export class SaleFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    userId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    bookId?: number;

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
    @Type(() => Date)
    @IsDate()
    saleAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    minSaleAt?: Date;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minSaleAt'])
    maxSaleAt?: Date;
}
