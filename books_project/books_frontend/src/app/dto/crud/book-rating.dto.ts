export class BookRatingDto {
    constructor(public id: number,
                public userId: number,
                public bookId: number,
                public value: number) {}
}
