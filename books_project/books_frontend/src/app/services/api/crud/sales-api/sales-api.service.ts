import { Injectable } from '@angular/core';
import { Sale } from "../../../../entities/Sale";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { SaleFilterDto } from "../../../../dto/filters/sale-filter.dto";
import { SaleDto } from "../../../../dto/crud/sale.dto";

@Injectable({
    providedIn: 'root'
})
export class SalesApiService {
    private static readonly basePath = 'sales/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: SaleFilterDto) {
        return this._apiService.get(SalesApiService.basePath, filter)
            .pipe(map((data: Partial<Sale>[]) => data.map(a => Sale.assign(new Sale(), a))));
    }

    findOne(filter?: SaleFilterDto) {
        return this._apiService.get(SalesApiService.basePath + '/first', filter)
            .pipe(map(data => Sale.assign(new Sale(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(SalesApiService.basePath + `/${id}`)
            .pipe(map(data => Sale.assign(new Sale(), data)));
    }

    create(item: Sale) {
        const dto = new SaleDto(0, item.user.id, item.book.id, item.price, item.saleAt);
        return this._apiService.post(SalesApiService.basePath, item);
    }

    update(item: Sale) {
        const dto = new SaleDto(item.id, item.user.id, item.book.id, item.price, item.saleAt);
        return this._apiService.put(SalesApiService.basePath, item);
    }
}
