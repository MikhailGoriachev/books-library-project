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
import { PageOptionsDto } from '../../../dto/pagination/page-options.dto';
import { PageDto } from '../../../dto/pagination/page.dto';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';

@Controller('books')
export class BooksController {
    constructor(private _booksService: BooksService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findAll(filter);
    }

    @Get('pagination')
    findAllPagination(@Query() pageOptionsDto: BookPaginationFilterDto) {
        return this._booksService.findAllByPagination(pageOptionsDto);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findOne(filter);
    }

    @Get('price-range')
    priceRange() {
        return this._booksService.getPriceRange();
    }

    @Get('publication-year-range')
    publicationYearRange() {
        return this._booksService.getPublicationYearRange();
    }

    // десять самых рейтинговых книг
    @Get('top-by-rating')
    topBooksByRating(): Promise<Book[]> {
        return this._booksService.topBooksByRating();
    }

    // десять самых просматриваемых книг
    @Get('top-by-viewed')
    topBooksByViewed(): Promise<Book[]> {
        return this._booksService.topBooksByViewed();
    }

    // десять последних добавленных книг
    @Get('top-by-addition')
    topBooksByAddition(): Promise<Book[]> {
        return this._booksService.topBooksByAddition();
    }
    
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('/with-deleted')
    findAllWithDeleted(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findAll(filter, true);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('pagination/with-deleted')
    findAllPaginationWithDeleted(@Query() pageOptionsDto: BookPaginationFilterDto) {
        return this._booksService.findAllByPagination(pageOptionsDto, true);
    }
    
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get(':id/with-deleted')
    findOneByIdWithDeleted(@Param('id', ParseIntPipe) id: number) {
        return this._booksService.findOne({ id }, true);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('first/with-deleted')
    findOneWithDeleted(@Query(new ValidationPipe({ transform: true })) filter: BookFilterDto) {
        return this._booksService.findOne(filter, true);
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
    
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._booksService.findOne({ id });
    }
}
