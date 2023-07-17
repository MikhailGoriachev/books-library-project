import { IsInt, IsOptional, Max, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { LessThanOrEqualsValidator } from '../../validators/less-than-or-equals.validator';

export class AuthorViewStatisticFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    authorId?: number;
    
    @IsOptional()
    @Type(() => Number)
    @Min(0)
    amount?: number;
    
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    minAmount?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Validate(LessThanOrEqualsValidator, ['minAmount'])
    maxAmount?: number;
}
