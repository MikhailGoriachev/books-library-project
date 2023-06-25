import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class BookFileDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    path: string;

    @IsInt()
    @Min(1)
    fileExtensionId: number;

    @IsInt()
    @Min(1)
    bookId: number;
}
