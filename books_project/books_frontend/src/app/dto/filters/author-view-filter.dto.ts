export class AuthorViewFilterDto {
    constructor(public id?: number,
                public userId?: number,
                public authorId?: number,
                public viewedAt?: Date,
                public minViewedAt?: Date,
                public maxViewedAt?: Date) {}
}
