import {
    IsBoolean, IsEmail,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class UserCreateDto {
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
    
    @IsBoolean()
    isAdmin: boolean;
}
