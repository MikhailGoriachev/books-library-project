﻿import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UserEditProfileDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
}
