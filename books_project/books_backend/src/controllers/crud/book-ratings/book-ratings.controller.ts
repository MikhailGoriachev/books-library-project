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
import { BookRatingsService } from '../../../database/services/book-ratings/book-ratings.service';
import { BookRatingFilterDto } from '../../../dto/filters/book-rating-filter.dto';
import { BookRatingDto } from '../../../dto/crud/book-rating.dto';
import { BookRating } from '../../../database/entities/BookRating';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('book-ratings')
export class BookRatingsController {
    constructor(private _bookRatingsService: BookRatingsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookRatingFilterDto) {
        return this._bookRatingsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookRatingFilterDto) {
        return this._bookRatingsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._bookRatingsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: BookRatingDto) {
        item.id = null;
        return this._bookRatingsService.save(Object.assign(new BookRating(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: BookRatingDto) {
        return this._bookRatingsService.save(Object.assign(new BookRating(), item));
    }
}
