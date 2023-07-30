export class SaleFilterDto {
    constructor(public id?: number,

                public userId?: number,

                public bookId?: number,

                public price?: number,

                public minPrice?: number,

                public maxPrice?: number,

                public saleAt?: Date,

                public minSaleAt?: Date,

                public maxSaleAt?: Date) {}
}
