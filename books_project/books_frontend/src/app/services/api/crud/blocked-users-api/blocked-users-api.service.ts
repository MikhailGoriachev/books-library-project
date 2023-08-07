import { Injectable } from '@angular/core';
import { BlockedUser } from "../../../../entities/BlockedUser";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { BlockedUserFilterDto } from "../../../../dto/filters/blocked-user-filter.dto";
import { BlockedUserDto } from "../../../../dto/crud/blocked-user.dto";

@Injectable({
    providedIn: 'root'
})
export class BlockedUsersApiService {
    private static readonly basePath = 'blocked-users/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: BlockedUserFilterDto) {
        return this._apiService.get(BlockedUsersApiService.basePath, filter)
            .pipe(map((data: Partial<BlockedUser>[]) => data.map(a => BlockedUser.assign(new BlockedUser(), a))));
    }

    findOne(filter?: BlockedUserFilterDto) {
        return this._apiService.get(BlockedUsersApiService.basePath + '/first', filter)
            .pipe(map(data => BlockedUser.assign(new BlockedUser(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(BlockedUsersApiService.basePath + `/${id}`)
            .pipe(map(data => BlockedUser.assign(new BlockedUser(), data)));
    }

    create(item: BlockedUser) {
        const dto = new BlockedUserDto(0, item.user.id, item.blockedAt, item.unblockedAt);
        return this._apiService.post(BlockedUsersApiService.basePath, item);
    }

    update(item: BlockedUser) {
        const dto = new BlockedUserDto(item.id, item.user.id, item.blockedAt, item.unblockedAt);
        return this._apiService.put(BlockedUsersApiService.basePath, item);
    }
}
