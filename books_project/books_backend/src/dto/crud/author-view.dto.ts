import { IsDate, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AuthorViewDto {
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    userId: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    authorId: number;

    @Type(() => Date)
    @IsDate()
    viewedAt: Date;
}
