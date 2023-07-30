export class BookRatingStatisticFilterDto {
    constructor(public id?: number,
                public bookId?: number,
                public value?: number,
                public minValue?: number,
                public maxValue?: number) {}
}
