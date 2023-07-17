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
import { BookViewsService } from '../../../database/services/book-views/book-views.service';
import { BookViewFilterDto } from '../../../dto/filters/book-view-filter.dto';
import { BookViewDto } from '../../../dto/crud/book-view.dto';
import { BookView } from '../../../database/entities/BookView';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('book-views')
export class BookViewsController {
    constructor(private _bookViewsService: BookViewsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookViewFilterDto) {
        return this._bookViewsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookViewFilterDto) {
        return this._bookViewsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._bookViewsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: BookViewDto) {
        item.id = null;
        return this._bookViewsService.save(Object.assign(new BookView(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: BookViewDto) {
        return this._bookViewsService.save(Object.assign(new BookView(), item));
    }
}
