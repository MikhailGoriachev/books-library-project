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
import { CategoriesService } from '../../../database/services/categories/categories.service';
import { CategoryFilterDto } from '../../../dto/filters/category-filter.dto';
import { CategoryDto } from '../../../dto/crud/category.dto';
import { Category } from '../../../database/entities/Category';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('categories')
export class CategoriesController {
    constructor(private _categoriesService: CategoriesService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: CategoryFilterDto) {
        return this._categoriesService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: CategoryFilterDto) {
        return this._categoriesService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._categoriesService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: CategoryDto) {
        item.id = null;
        return this._categoriesService.save(Object.assign(new Category(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: CategoryDto) {
        return this._categoriesService.save(Object.assign(new Category(), item));
    }
}
