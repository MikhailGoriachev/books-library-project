import { Injectable } from '@angular/core';
import { UserCartItem } from "../../../../entities/UserCartItem";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { UserCartItemFilterDto } from "../../../../dto/filters/user-cart-item-filter.dto";
import { UserCartItemDto } from "../../../../dto/crud/user-cart-item.dto";

@Injectable({
    providedIn: 'root'
})
export class UserCartItemsApiService {
    private static readonly basePath = 'user-cart-items/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: UserCartItemFilterDto) {
        return this._apiService.get(UserCartItemsApiService.basePath, filter)
            .pipe(map((data: Partial<UserCartItem>[]) => data.map(a => UserCartItem.assign(new UserCartItem(), a))));
    }

    findOne(filter?: UserCartItemFilterDto) {
        return this._apiService.get(UserCartItemsApiService.basePath + '/first', filter)
            .pipe(map(data => UserCartItem.assign(new UserCartItem(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(UserCartItemsApiService.basePath + `/${id}`)
            .pipe(map(data => UserCartItem.assign(new UserCartItem(), data)));
    }

    create(item: UserCartItem) {
        const dto = new UserCartItemDto(0, item.user.id, item.book.id);
        return this._apiService.post(UserCartItemsApiService.basePath, item);
    }

    update(item: UserCartItem) {
        const dto = new UserCartItemDto(item.id, item.user.id, item.book.id);
        return this._apiService.put(UserCartItemsApiService.basePath, item);
    }
}
