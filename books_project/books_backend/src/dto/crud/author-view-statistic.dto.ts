import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthorViewStatisticDto {
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    authorId?: number;
    
    @Type(() => Number)
    @Min(0)
    amount: number;
}
