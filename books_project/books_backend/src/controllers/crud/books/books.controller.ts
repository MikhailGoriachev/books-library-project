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
import { BooksService } from '../../../database/services/books/books.service';
import { Book } from '../../../database/entities/Book';
import { BookDto } from '../../../dto/crud/book.dto';
import { BookFilterDto } from '../../../dto/filters/book-filter.dto';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('books')
export class BooksController {
    constructor(private _booksService: BooksService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._booksService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: BookDto) {
        item.id = null;
        return this._booksService.save(Object.assign(new Book(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: BookDto) {
        return this._booksService.save(Object.assign(new Book(), item));
    }
}
