export class UserReportFilterDto {
    constructor(
        public begin?: Date,
        public end?: Date,
        public id?: number,
        public name?: string,
        public email?: string,
        public image?: string
    ) {}
}
