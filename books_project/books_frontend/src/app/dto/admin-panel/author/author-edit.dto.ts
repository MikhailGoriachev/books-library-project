export class AuthorEditDto {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public detailsLink?: string,
        public image?: string,
    ) {}
}
