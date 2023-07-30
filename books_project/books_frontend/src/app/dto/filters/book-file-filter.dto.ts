export class BookFileFilterDto {
    constructor(public id?: number,
                public path?: string,
                public fileExtensionId?: number,
                public bookId?: number) {}
}
