import { IsBoolean, IsDefined, IsInt, IsOptional, IsString, IsStrongPassword, MaxLength, Min } from 'class-validator';

export class UserPasswordDto {
    @IsInt()
    @Min(0)
    id: string;
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    password: string;

    // признак аутентификации с помощью внешних сервисов
    @IsBoolean()
    isServiceAuth: boolean;
}
