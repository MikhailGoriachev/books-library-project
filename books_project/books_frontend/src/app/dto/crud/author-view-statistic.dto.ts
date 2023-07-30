export class AuthorViewStatisticDto {
    constructor(public id: number,
                public authorId: number | undefined,
                public amount: number) {
    }

}
