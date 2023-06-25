import { IsBoolean, IsDefined, IsInt, IsString, IsStrongPassword, Min } from 'class-validator';

export class UserPasswordFilterDto {
    @IsInt()
    @Min(0)
    id?: string;

    @IsDefined()
    @IsString()
    userId?: number;

    @IsDefined()
    @IsString()
    password?: string;

    // признак аутентификации с помощью внешних сервисов
    @IsBoolean()
    isServiceAuth?: boolean;
}
