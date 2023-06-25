import { IsDate, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class RoleDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}
