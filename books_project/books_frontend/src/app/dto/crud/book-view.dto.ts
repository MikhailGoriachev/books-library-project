export class BookViewDto {
    constructor(public id: number,
                public userId: number,
                public bookId: number,
                public viewedAt: Date) {}
}
