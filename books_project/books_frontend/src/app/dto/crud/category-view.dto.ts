export class CategoryViewDto {
    constructor(public id: number,
                public userId: number,
                public categoryId: number,
                public viewedAt: Date) {}
}
