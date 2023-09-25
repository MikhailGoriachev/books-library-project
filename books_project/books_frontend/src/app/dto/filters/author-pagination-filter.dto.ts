import { OrderEnum } from "../../infrastructure/OrderEnum";
import { PageOptionsDto } from "../pagination/page-options.dto";

export class AuthorPaginationFilterDto extends PageOptionsDto {
    constructor(
        order?: OrderEnum,
        page?: number,
        take?: number,
        public id?: number,
        public ids?: number[],
        public name?: string,
        public description?: string,
        public detailsLink?: string,
        public image?: string,
        public booksId?: number[]
    ) {
        super(order, page, take);
    }
}
