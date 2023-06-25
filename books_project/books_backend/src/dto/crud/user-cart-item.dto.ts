import {
    IsInt,
    Min,
} from 'class-validator';

export class UserCartItemDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(1)
    userId: string;

    @IsInt()
    @Min(1)
    bookId: string;
}
