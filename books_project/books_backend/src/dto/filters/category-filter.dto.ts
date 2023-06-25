import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CategoryFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name?: string;
}
