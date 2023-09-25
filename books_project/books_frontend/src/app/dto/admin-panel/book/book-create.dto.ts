export class BookCreateDto {
    constructor(
        public title?: string,
        public description?: string,
        public image?: string,
        public price?: number,
        public publicationYear?: number,
        public isbn?: string,
        public authorsId?: number[],
        public categoriesId?: number[],
    ) {
    }
}
