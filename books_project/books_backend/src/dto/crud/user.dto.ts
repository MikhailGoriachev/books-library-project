import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString, MaxLength,
    Min,
} from 'class-validator';

export class UserDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;
    
    @IsString()
    @MaxLength(255)
    image: string;
}
