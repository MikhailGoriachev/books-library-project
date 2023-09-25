import { OrderEnum } from "../../infrastructure/OrderEnum";

export class PageOptionsDto {
    public order?: OrderEnum = OrderEnum.ASC;

    public page?: number = 1;

    public take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }

    constructor(order?: OrderEnum, page?: number, take?: number) {
        this.order = order;
        this.page = page;
        this.take = take;
    }
}
