export class AuthorReportFilterDto {
    constructor(
        public begin?: Date,
        public end?: Date,
        public id?: number,
        public ids?: number[],
        public name?: string,
        public description?: string,
        public detailsLink?: string,
        public image?: string,
        public booksId?: number[]
    ) {}
}
