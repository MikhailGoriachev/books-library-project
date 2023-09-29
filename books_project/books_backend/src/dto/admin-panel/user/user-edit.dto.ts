import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class UserEditDto {
    @IsInt()
    @Min(1)
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
    
    @IsBoolean()
    isAdmin: boolean;
}
