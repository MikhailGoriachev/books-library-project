export class BookEditDto {
    constructor(
        public id?: number,
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
