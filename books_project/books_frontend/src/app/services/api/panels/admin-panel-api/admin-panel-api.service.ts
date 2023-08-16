import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserRoleDto } from "../../../../dto/user-role.dto";
import { ApiService } from "../../api.service";

@Injectable({
    providedIn: 'root'
})
export class AdminPanelApiService {
    private static readonly basePath = 'admin-panel/'

    constructor(private readonly _apiService: ApiService) {}

    // заблокировать пользователя
    blockUser(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/block', { userId });
    }

    // разблокировать пользователя
    unblockUser(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/unblock', { userId });
    }

    // получить роли пользователей
    userRoles(userId: number) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles', { userId });
    }

    // назначить роль пользователя
    addUserRole(userRole: UserRoleDto) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles/add', userRole);
    }

    // убрать роль пользователя
    removeUserRole(userRole: UserRoleDto) {
        return this._apiService.post(AdminPanelApiService.basePath + 'user/roles/remove', userRole);
    }

    // добавить данные о книге
    addBook() {

    }
}
