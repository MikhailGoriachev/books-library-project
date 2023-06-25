import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString, IsUrl, MaxLength,
    Min,
} from 'class-validator';

export class AuthorFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name?: string;

    @IsString()
    @MaxLength(2000)
    description?: string;

    @IsString()
    @IsUrl()
    @MaxLength(512)
    detailsLink?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image?: string;

    @IsArray()
    booksId?: number[];
}
