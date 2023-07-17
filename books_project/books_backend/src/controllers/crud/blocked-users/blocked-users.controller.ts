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
import { BlockedUsersService } from '../../../database/services/blocked-users/blocked-users.service';
import { BlockedUserFilterDto } from '../../../dto/filters/blocked-user-filter.dto';
import { BlockedUserDto } from '../../../dto/crud/blocked-user.dto';
import { BlockedUser } from '../../../database/entities/BlockedUser';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('blocked-users')
export class BlockedUsersController {
    constructor(private _blockedUsersService: BlockedUsersService) {}
    
    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BlockedUserFilterDto) {
        return this._blockedUsersService.findAll(filter);
    }
    
    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BlockedUserFilterDto) {
        return this._blockedUsersService.findOne(filter);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._blockedUsersService.findOne({ id });
    }

    @Roles(RolesEnum.admin)
    @Post()
    create(@Body() item: BlockedUserDto) {
        item.id = null;
        return this._blockedUsersService.save(Object.assign(new BlockedUser(), item));
    }

    @Roles(RolesEnum.admin)
    @Put()
    update(@Body() item: BlockedUserDto) {
        return this._blockedUsersService.save(Object.assign(new BlockedUser(), item));
    }
}
