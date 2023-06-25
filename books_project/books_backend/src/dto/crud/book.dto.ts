import { IsInt, IsISBN, IsNotEmpty, IsNumber, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export class BookDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    title: string;

    @IsString()
    @MaxLength(2000)
    description: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsInt()
    @Min(1000)
    @Max(new Date().getFullYear())
    publicationYear: number;

    @IsISBN()
    isbn: string;
}
