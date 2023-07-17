import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { RolesService } from '../../../database/services/roles/roles.service';
import { RoleFilterDto } from '../../../dto/filters/role-filter.dto';
import { RoleDto } from '../../../dto/crud/role.dto';
import { Role } from '../../../database/entities/Role';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('roles')
export class RolesController {
    constructor(private _rolesService: RolesService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: RoleFilterDto) {
        return this._rolesService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: RoleFilterDto) {
        return this._rolesService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._rolesService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: RoleDto) {
        item.id = null;
        return this._rolesService.save(Object.assign(new Role(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: RoleDto) {
        return this._rolesService.save(Object.assign(new Role(), item));
    }
}
