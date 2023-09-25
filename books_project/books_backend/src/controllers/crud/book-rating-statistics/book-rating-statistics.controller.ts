
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
import { BookRatingStatisticFilterDto } from '../../../dto/filters/book-rating-statistic-filter.dto';
import {
    BookRatingStatisticsService
} from '../../../database/services/book-rating-statistics/book-rating-statistics.service';
import { BookRatingStatisticDto } from '../../../dto/crud/book-rating-statistic.dto';
import { BookRatingStatistic } from '../../../database/entities/BookRatingStatistic';

@Controller('book-rating-statistics')
export class BookRatingStatisticsController {
    constructor(private _bookRatingStatisticsService: BookRatingStatisticsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookRatingStatisticFilterDto) {
        return this._bookRatingStatisticsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookRatingStatisticFilterDto) {
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
    create(@Body() item: BookRatingStatisticDto) {
        item.id = null;
        return this._bookRatingStatisticsService.save(Object.assign(new BookRatingStatistic(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: BookRatingStatisticDto) {
        return this._bookRatingStatisticsService.save(Object.assign(new BookRatingStatistic(), item));
    }
}
