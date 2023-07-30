export class CategoryViewStatisticDto {
    constructor(public id: number,
                public categoryId: number | undefined,
                public amount: number) {
    }

}
