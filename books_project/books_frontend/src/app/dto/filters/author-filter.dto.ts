export class AuthorFilterDto {
    constructor(public id?: number,
                public name?: string,
                public description?: string,
                public detailsLink?: string,
                public image?: string,
                public booksId?: number[],) {}
}
