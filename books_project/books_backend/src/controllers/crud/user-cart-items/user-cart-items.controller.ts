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
import { UserCartItemsService } from '../../../database/services/user-cart-items/user-cart-items.service';
import { UserCartItemFilterDto } from '../../../dto/filters/user-cart-item-filter.dto';
import { UserCartItemDto } from '../../../dto/crud/user-cart-item.dto';
import { UserCartItem } from '../../../database/entities/UserCartItem';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';


@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('user-cart-items')
export class UserCartItemsController {
    constructor(private _userCartItemsService: UserCartItemsService) {}

    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: UserCartItemFilterDto) {
        return this._userCartItemsService.findAll(filter);
    }

    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: UserCartItemFilterDto) {
        return this._userCartItemsService.findOne(filter);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._userCartItemsService.findOne({ id });
    }

    @Roles(RolesEnum.admin)
    @Post()
    create(@Body() item: UserCartItemDto) {
        item.id = null;
        return this._userCartItemsService.save(Object.assign(new UserCartItem(), item));
    }

    @Roles(RolesEnum.admin)
    @Put()
    update(@Body() item: UserCartItemDto) {
        return this._userCartItemsService.save(Object.assign(new UserCartItem(), item));
    }
}
