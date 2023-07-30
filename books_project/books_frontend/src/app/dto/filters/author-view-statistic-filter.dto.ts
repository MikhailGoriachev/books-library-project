export class AuthorViewStatisticFilterDto {
    constructor(public id?: number,
                public authorId?: number,
                public amount?: number,
                public minAmount?: number,
                public maxAmount?: number) {
    }
}
