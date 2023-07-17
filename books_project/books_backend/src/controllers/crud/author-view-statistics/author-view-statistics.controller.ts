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
import { AuthorViewStatisticFilterDto } from '../../../dto/filters/author-view-statistic-filter.dto';
import {
    AuthorViewStatisticsService,
} from '../../../database/services/author-view-statistics/author-view-statistics.service';
import { AuthorViewStatisticDto } from '../../../dto/crud/author-view-statistic.dto';
import { AuthorViewStatistic } from '../../../database/entities/AuthorViewStatistic';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';

@Controller('author-view-statistics')
export class AuthorViewStatisticsController {
    constructor(private _authorViewStatisticsService: AuthorViewStatisticsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: AuthorViewStatisticFilterDto) {
        return this._authorViewStatisticsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: AuthorViewStatisticFilterDto) {
        return this._authorViewStatisticsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._authorViewStatisticsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: AuthorViewStatisticDto) {
        item.id = null;
        return this._authorViewStatisticsService.save(Object.assign(new AuthorViewStatistic(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: AuthorViewStatisticDto) {
        return this._authorViewStatisticsService.save(Object.assign(new AuthorViewStatistic(), item));
    }
}
