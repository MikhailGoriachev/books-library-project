import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class TokenDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(512)
    accessToken: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(512)
    refreshToken: string;
}
