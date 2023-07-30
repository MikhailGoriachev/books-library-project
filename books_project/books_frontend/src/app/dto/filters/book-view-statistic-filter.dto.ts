export class BookViewStatisticFilterDto {
    constructor(public id?: number,
                public bookId?: number,
                public amount?: number,
                public minAmount?: number,
                public maxAmount?: number) {}
}
