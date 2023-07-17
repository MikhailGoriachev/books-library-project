import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../../../database/services/users/users.service';
import { User } from '../../../database/entities/User';
import { UserDto } from '../../../dto/crud/user.dto';
import { UserFilterDto } from '../../../dto/filters/user-filter.dto';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: UserFilterDto) {
        return this._usersService.findAll(filter);
    }

    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: UserFilterDto) {
        return this._usersService.findOne(filter);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._usersService.findOne({ id });
    }

    @Roles(RolesEnum.admin)
    @Post()
    create(@Body() item: UserDto) {
        item.id = null;
        return this._usersService.save(Object.assign(new User(), item));
    }

    @Roles(RolesEnum.admin)
    @Put()
    update(@Body() item: UserDto) {
        return this._usersService.save(Object.assign(new User(), item));
    }
}
