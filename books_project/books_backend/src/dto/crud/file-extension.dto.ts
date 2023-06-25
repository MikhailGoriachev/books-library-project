import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class FileExtensionDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}
