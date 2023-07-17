import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, MaxLength, Min } from 'class-validator';

export class RegistrationDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;
    
    @IsStrongPassword()
    password: string;
}
