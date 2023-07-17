import { IsInt, Min } from 'class-validator';

export class UserRoleDto {
    @IsInt()
    @Min(1)
    userId: number;

    @IsInt()
    @Min(1)
    roleId: number;
}
