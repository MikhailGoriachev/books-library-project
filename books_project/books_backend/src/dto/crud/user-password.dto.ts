import { IsBoolean, IsDefined, IsInt, IsString, IsStrongPassword, Min } from 'class-validator';

export class UserPasswordDto {
    @IsInt()
    @Min(0)
    id: string;

    @IsDefined()
    @IsString()
    @IsStrongPassword()
    password: string;

    // признак аутентификации с помощью внешних сервисов
    @IsBoolean()
    isServiceAuth: boolean;
}
