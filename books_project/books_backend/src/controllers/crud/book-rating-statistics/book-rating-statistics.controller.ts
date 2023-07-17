import { BookViewStatistic } from '../../../database/entities/BookViewStatistic';
import { BookViewStatisticDto } from '../../../dto/crud/book-view-statistic.dto';
import { BookViewStatisticFilterDto } from '../../../dto/filters/book-view-statistic-filter.dto';
import {
    BookViewStatisticsService,
} from '../../../database/services/book-view-statistics/book-view-statistics.service';
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
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('book-rating-statistics')
export class BookRatingStatisticsController {
    constructor(private _bookRatingStatisticsService: BookViewStatisticsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookViewStatisticFilterDto) {
        return this._bookRatingStatisticsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookViewStatisticFilterDto) {
        return this._bookRatingStatisticsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._bookRatingStatisticsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: BookViewStatisticDto) {
        item.id = null;
        return this._bookRatingStatisticsService.save(Object.assign(new BookViewStatistic(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: BookViewStatisticDto) {
        return this._bookRatingStatisticsService.save(Object.assign(new BookViewStatistic(), item));
    }
}
