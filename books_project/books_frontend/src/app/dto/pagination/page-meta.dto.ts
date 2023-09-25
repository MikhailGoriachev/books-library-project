import { PageMetaDtoParameters } from './page-meta-dto-parameters';

export class PageMetaDto {
    public page: number;

    public take: number;

    public itemCount: number;

    public pageCount: number;

    public hasPreviousPage: boolean;

    public hasNextPage: boolean;


    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.take = pageOptionsDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
