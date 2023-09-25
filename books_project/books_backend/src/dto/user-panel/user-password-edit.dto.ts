import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserPasswordEditDto {
    @IsString()
    @MaxLength(255)
    password: string;
    
    @IsString()
    @MaxLength(255)
    newPassword: string;
}
