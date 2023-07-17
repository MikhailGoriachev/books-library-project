import { Body, Controller, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AdminPanelService } from '../../../services/panels/admin-panel/admin-panel.service';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { UserRoleDto } from '../../../dto/user-role.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('admin-panel')
export class AdminPanelController {
    constructor(private _adminPanelService: AdminPanelService) {}

    // заблокировать пользователя
    @Roles(RolesEnum.admin)
    @Post('user/block')
    async blockUser(@Body('userId', ParseIntPipe) userId: number) {
        await this._adminPanelService.blockUser(userId);
    }

    // разблокировать пользователя
    @Roles(RolesEnum.admin)
    @Post('user/unblock')
    async unblockUser(@Body('userId', ParseIntPipe) userId: number) {
        await this._adminPanelService.unblockUser(userId);
    }
    
    // получить роли пользователей
    @Roles(RolesEnum.admin)
    @Post('user/roles')
    async userRoles(@Body('userId', ParseIntPipe) userId: number) {
        return await this._adminPanelService.userRoles(userId);
    }
    
    // назначить роль пользователя
    @Roles(RolesEnum.admin)
    @Post('user/roles/add')
    async addUserRole(@Body() userRole: UserRoleDto) {
        await this._adminPanelService.addUserRole(userRole);
    }
    
    // убрать роль пользователя
    @Roles(RolesEnum.admin)
    @Post('user/roles/remove')
    async removeUserRole(@Body() userRole: UserRoleDto) {
        await this._adminPanelService.removeUserRole(userRole);
    }
    
    // добавить данные о книге
    @Roles(RolesEnum.admin)
    @Post('user/roles/add')
    async addBook() {
        
    }
}
