export class SaleDto {
    constructor(public id: number,
                public userId: number,
                public bookId: number,
                public price: number,
                public saleAt: Date) {}
}
