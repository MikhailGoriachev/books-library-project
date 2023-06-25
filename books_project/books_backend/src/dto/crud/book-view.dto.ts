import { IsDate, IsInt, Min } from 'class-validator';

export class BookViewDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(0)
    userId: number;

    @IsInt()
    @Min(1)
    bookId: number;

    @IsDate()
    viewedAt: Date;
}
