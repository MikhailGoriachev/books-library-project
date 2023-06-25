import { IsInt, Max, Min } from 'class-validator';

export class BookRatingDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(1)
    userId: number;

    @IsInt()
    @Min(1)
    bookId: number;

    @IsInt()
    @Min(1)
    @Max(5)
    value: number;
}
