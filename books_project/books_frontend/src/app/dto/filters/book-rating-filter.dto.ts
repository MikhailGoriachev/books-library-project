export class BookRatingFilterDto {
    constructor(public id?: number,
                public userId?: number,
                public bookId?: number,
                public value?: number,
                public minValue?: number,
                public maxValue?: number) {}
}
