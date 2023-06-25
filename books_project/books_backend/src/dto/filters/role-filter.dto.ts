import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class RoleFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name?: string;
}
