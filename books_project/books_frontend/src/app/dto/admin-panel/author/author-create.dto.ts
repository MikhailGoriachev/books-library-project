export class AuthorCreateDto {
    constructor(
        public name?: string,
        public description?: string,
        public detailsLink?: string,
        public image?: string,
    ) {}
}
