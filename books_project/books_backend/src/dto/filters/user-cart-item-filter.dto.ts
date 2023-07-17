import {
    IsInt, IsOptional,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserCartItemFilterDto {
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
}
