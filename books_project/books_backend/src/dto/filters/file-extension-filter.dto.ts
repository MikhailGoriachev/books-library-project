import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class FileExtensionFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;
}
