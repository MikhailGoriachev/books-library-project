import { PageOptionsDto } from "../pagination/page-options.dto";
import { OrderEnum } from "../../infrastructure/OrderEnum";

export class BookPaginationFilterDto extends PageOptionsDto {
    constructor(order?: OrderEnum,
                page?: number,
                take?: number,
                public id?: number,
                public title?: string,
                public description?: string,
                public image?: string,
                public price?: number,
                public minPrice?: number,
                public maxPrice?: number,
                public publicationYear?: number,
                public minPublicationYear?: number,
                public maxPublicationYear?: number,
                public isbn?: string,
                public categoriesId?: number[],
                public authorsId?: number[],
                public authorName?: string,
                public categoryName?: string) {
        super(order, page, take);
    }
}
