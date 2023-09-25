export declare class BookFilterDto {
    id?: number;
    ids?: number[];
    title?: string;
    description?: string;
    image?: string;
    price?: number;
    minPrice?: number;
    maxPrice?: number;
    publicationYear?: number;
    minPublicationYear?: number;
    maxPublicationYear?: number;
    isbn?: string;
    categoriesId?: number[];
    authorsId?: number[];
    authorName?: string;
    categoryName?: string;
}
