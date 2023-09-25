import {
    IsArray,
    IsInt,
    IsISBN,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class AuthorEditDto {
    @IsInt()
    @Min(1)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @IsString()
    @MaxLength(2000)
    description: string;

    @IsString()
    @IsUrl()
    @MaxLength(512)
    detailsLink: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    image: string;
}
