import {
    IsInt,
    Min,
} from 'class-validator';

export class UserCartItemFilterDto {
    @IsInt()
    @Min(0)
    id?: number;

    @IsInt()
    @Min(1)
    userId?: number;

    @IsInt()
    @Min(1)
    bookId?: number;
}
