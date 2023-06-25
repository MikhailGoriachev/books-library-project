import {
    IsEmail, IsInt,
    IsNotEmpty,
    IsString,
    MaxLength, Min, Type
} from 'class-validator';

export class UserFilterDto {
    @IsInt()
    @Min(0)
    @Type(() => Number)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;

    @IsEmail()
    @MaxLength(255)
    email?: string;
}
