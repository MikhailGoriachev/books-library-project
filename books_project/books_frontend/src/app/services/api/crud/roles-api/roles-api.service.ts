import { Injectable } from '@angular/core';
import { Role } from "../../../../entities/Role";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { RoleFilterDto } from "../../../../dto/filters/role-filter.dto";
import { RoleDto } from "../../../../dto/crud/role.dto";

@Injectable({
    providedIn: 'root'
})
export class RolesApiService {
    private static readonly basePath = 'roles/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: RoleFilterDto) {
        return this._apiService.get(RolesApiService.basePath, filter)
            .pipe(map((data: Partial<Role>[]) => data.map(a => Role.assign(new Role(), a))));
    }

    findOne(filter?: RoleFilterDto) {
        return this._apiService.get(RolesApiService.basePath + '/first', filter)
            .pipe(map(data => Role.assign(new Role(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(RolesApiService.basePath + `/${id}`)
            .pipe(map(data => Role.assign(new Role(), data)));
    }

    create(item: Role) {
        const dto = new RoleDto(0, item.name);
        return this._apiService.post(RolesApiService.basePath, item);
    }

    update(item: Role) {
        const dto = new RoleDto(item.id, item.name);
        return this._apiService.put(RolesApiService.basePath, item);
    }
}
