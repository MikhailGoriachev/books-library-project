import { PageOptionsDto } from '../pagination/page-options.dto';
import { OrderEnum } from "../../infrastructure/OrderEnum";

export class UserPaginationFilterDto extends PageOptionsDto {
    constructor(
        order?: OrderEnum,
        page?: number,
        take?: number,
        public id?: number,
        public name?: string,
        public email?: string
    ) {
        super();
    }
}
