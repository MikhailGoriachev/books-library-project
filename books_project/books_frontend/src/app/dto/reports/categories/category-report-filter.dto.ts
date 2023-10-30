export class CategoryReportFilterDto {
    constructor(
        public begin?: Date,
        public end?: Date,
        public id?: number,
        public ids?: number[],
        public name?: string,
    ) {}
}
