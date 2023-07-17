import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class BookFileFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    path?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    fileExtensionId?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    bookId?: number;
}
