import { IsDate, IsInt, IsNumber, Min } from 'class-validator';

export class SaleDto {
    @IsInt()
    @Min(0)
    id: number;

    @IsInt()
    @Min(1)
    userId: number;

    @IsInt()
    @Min(1)
    bookId: number;

    @IsNumber()
    @Min(0)
    price: number;

    @IsDate()
    saleAt: Date;
}
