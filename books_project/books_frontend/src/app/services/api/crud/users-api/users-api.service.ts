import { Injectable } from '@angular/core';
import { User } from "../../../../entities/User";
import { ApiService } from "../../api.service";
import { map, tap } from "rxjs";
import { UserFilterDto } from "../../../../dto/filters/user-filter.dto";
import { UserDto } from "../../../../dto/crud/user.dto";
import { PageDto } from "../../../../dto/pagination/page.dto";
import { UserPaginationFilterDto } from "../../../../dto/filters/user-pagination-filter.dto";

@Injectable({
    providedIn: 'root'
})
export class UsersApiService {
    private static readonly basePath = 'users';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: UserFilterDto) {
        return this._apiService.get(UsersApiService.basePath, filter)
                   .pipe(map((data: Partial<User>[]) => data.map(a => User.assign(new User(), a))));
    }

    findAllPagination(filter?: Partial<UserPaginationFilterDto>) {
        return this._apiService.get(UsersApiService.basePath + '/pagination', filter)
                   .pipe(map((data: PageDto<User>) => {
                       return {...data, data: data.data.map(a => User.assign(new User(), a))};
                   }));
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
        const dto = new UserDto(0, item.name, item.email, item.image);
        return this._apiService.post(UsersApiService.basePath, item);
    }z

    update(item: User) {
        const dto = new UserDto(item.id, item.name, item.email, item.image);
        return this._apiService.put(UsersApiService.basePath, item);
    }
}
