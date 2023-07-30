export class CategoryViewStatisticFilterDto {
    constructor(public id?: number,
                public categoryId?: number,
                public amount?: number,
                public minAmount?: number,
                public maxAmount?: number) {}
}
