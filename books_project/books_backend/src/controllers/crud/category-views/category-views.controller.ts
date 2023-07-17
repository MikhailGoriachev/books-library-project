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
import { CategoryViewsService } from '../../../database/services/category-views/category-views.service';
import { CategoryViewFilterDto } from '../../../dto/filters/category-view-filter.dto';
import { CategoryViewDto } from '../../../dto/crud/category-view.dto';
import { CategoryView } from '../../../database/entities/CategoryView';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('category-views')
export class CategoryViewsController {
    constructor(private _categoryViewsService: CategoryViewsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: CategoryViewFilterDto) {
        return this._categoryViewsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: CategoryViewFilterDto) {
        return this._categoryViewsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._categoryViewsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: CategoryViewDto) {
        item.id = null;
        return this._categoryViewsService.save(Object.assign(new CategoryView(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: CategoryViewDto) {
        return this._categoryViewsService.save(Object.assign(new CategoryView(), item));
    }
}
