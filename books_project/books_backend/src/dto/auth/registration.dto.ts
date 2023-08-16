import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, MaxLength, Min, MinLength } from 'class-validator';

export class RegistrationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;
    
    // @IsStrongPassword()
    @IsString()
    // @MinLength(8)
    password: string;
}
