import {
    IsArray, IsDate,
    IsInt, IsISBN,
    IsNotEmpty, IsNumber,
    IsString, Max, MaxLength,
    Min, Validate,
} from 'class-validator';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class SaleFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsInt()
    @Min(1)
    userId?: number;

    @IsInt()
    @Min(1)
    bookId?: number;

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

    @IsDate()
    saleAt?: Date;

    @IsDate()
    minSaleAt?: Date;

    @IsDate()
    @Validate(LessThanOrEqualsValidator, ['minSaleAt'])
    maxSaleAt?: Date;
}
