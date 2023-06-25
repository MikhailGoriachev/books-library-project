import { IsDate, IsInt, Min } from 'class-validator';

export class CategoryViewDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(0)
    userId: number;

    @IsInt()
    @Min(1)
    categoryId: number;

    @IsDate()
    viewedAt: Date;
}
