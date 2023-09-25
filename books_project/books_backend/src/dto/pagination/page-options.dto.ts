﻿import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderEnum } from '../../infrastructure/OrderEnum';

export class PageOptionsDto {
    @IsEnum(OrderEnum)
    @IsOptional()
    readonly order?: OrderEnum = OrderEnum.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}