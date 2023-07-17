import { IsBoolean, IsDefined, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UserPasswordFilterDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    id?: number;

    @IsOptional()
    @IsDefined()
    @IsString()
    userId?: number;

    @IsOptional()
    @IsDefined()
    @IsString()
    password?: string;

    // признак аутентификации с помощью внешних сервисов
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    isServiceAuth?: boolean;
}
