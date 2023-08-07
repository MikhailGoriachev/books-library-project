import { Injectable } from '@angular/core';
import { User } from "../../../../entities/User";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { UserFilterDto } from "../../../../dto/filters/user-filter.dto";
import { UserDto } from "../../../../dto/crud/user.dto";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {
    private static readonly basePath = 'users/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: UserFilterDto) {
        return this._apiService.get(UsersApiService.basePath, filter)
            .pipe(map((data: Partial<User>[]) => data.map(a => User.assign(new User(), a))));
    }

    findOne(filter?: UserFilterDto) {
        return this._apiService.get(UsersApiService.basePath + '/first', filter)
            .pipe(map(data => User.assign(new User(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(UsersApiService.basePath + `/${id}`)
            .pipe(map(data => User.assign(new User(), data)));
    }

    create(item: User) {
        const dto = new UserDto(0, item.name, item.email);
        return this._apiService.post(UsersApiService.basePath, item);
    }

    update(item: User) {
        const dto = new UserDto(item.id, item.name, item.email);
        return this._apiService.put(UsersApiService.basePath, item);
    }
}
