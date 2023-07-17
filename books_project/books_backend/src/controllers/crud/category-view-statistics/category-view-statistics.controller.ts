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
import { CategoryViewStatisticFilterDto } from '../../../dto/filters/category-view-statistic-filter.dto';
import {
    CategoryViewStatisticsService,
} from '../../../database/services/category-view-statistics/category-view-statistics.service';
import { CategoryViewStatisticDto } from '../../../dto/crud/category-view-statistic.dto';
import { CategoryViewStatistic } from '../../../database/entities/CategoryViewStatistic';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('category-view-statistics')
export class CategoryViewStatisticsController {
    constructor(private _categoryViewStatisticsService: CategoryViewStatisticsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: CategoryViewStatisticFilterDto) {
        return this._categoryViewStatisticsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: CategoryViewStatisticFilterDto) {
        return this._categoryViewStatisticsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._categoryViewStatisticsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: CategoryViewStatisticDto) {
        item.id = null;
        return this._categoryViewStatisticsService.save(Object.assign(new CategoryViewStatistic(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: CategoryViewStatisticDto) {
        return this._categoryViewStatisticsService.save(Object.assign(new CategoryViewStatistic(), item));
    }
}
