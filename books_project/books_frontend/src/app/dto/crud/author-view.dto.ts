export class AuthorViewDto {
    constructor(public id: number,
                public userId: number,
                public authorId: number,
                public viewedAt: Date) {}
}
