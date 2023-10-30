﻿export class BooksReportFilterDto {
    constructor(
        public begin?: Date,
        public end?: Date,
        public id?: number,
        public ids?: number[],
        public title?: string,
        public description?: string,
        public image?: string,
        public price?: number,
        public minPrice?: number,
        public maxPrice?: number,
        public avgPriceSale?: number,
        public minAvgPriceSale?: number,
        public maxAvgPriceSale?: number,
        public publicationYear?: number,
        public minPublicationYear?: number,
        public maxPublicationYear?: number,
        public isbn?: string,
        public categoriesId?: number[],
        public authorsId?: number[],
        public authorName?: string,
        public categoryName?: string
    ) {}
}
