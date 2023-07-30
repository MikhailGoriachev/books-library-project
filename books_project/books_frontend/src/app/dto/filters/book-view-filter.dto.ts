export class BookViewFilterDto {
    constructor(public id?: number,
                public userId?: number,
                public bookId?: number,
                public viewedAt?: Date,
                public minViewedAt?: Date,
                public maxViewedAt?: Date) {}
}
