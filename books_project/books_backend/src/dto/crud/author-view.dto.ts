import { IsDate, IsInt, Min } from 'class-validator';

export class AuthorViewDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(0)
    userId: number;

    @IsInt()
    @Min(1)
    authorId: number;

    @IsDate()
    viewedAt: Date;
}
