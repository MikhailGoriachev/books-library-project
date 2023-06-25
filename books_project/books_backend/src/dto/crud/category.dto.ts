import { IsDate, IsInt, IsNotEmpty, IsNotIn, IsString, MaxLength, Min } from 'class-validator';

export class CategoryDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}
