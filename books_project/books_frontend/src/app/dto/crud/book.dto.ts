export class BookDto {
    constructor(public id: number,
                public title: string,
                public description: string,
                public image: string,
                public price: number,
                public publicationYear: number,
                public isbn: string) {
    }

}
