export class CategoryViewFilterDto {
    constructor(public id?: number,
                public userId?: number,
                public categoryId?: number,
                public viewedAt?: Date,
                public minViewedAt?: Date,
                public maxViewedAt?: Date) {}
}
