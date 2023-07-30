export class BookViewStatisticDto {
    constructor(public id: number,
                public bookId: number | undefined,
                public amount: number) {}
}
