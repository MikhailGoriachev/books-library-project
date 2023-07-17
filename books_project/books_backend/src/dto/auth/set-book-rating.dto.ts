import { IsInt, Max, Min } from 'class-validator';

export class SetBookRatingDto {
    @IsInt()
    @Min(1)
    bookId: number;

    @IsInt()
    @Min(1)
    @Max(5)
    value: number;
}
