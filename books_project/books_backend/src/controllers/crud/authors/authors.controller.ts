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
import { AuthorsService } from '../../../database/services/authors/authors.service';
import { AuthorDto } from '../../../dto/crud/author.dto';
import { Author } from '../../../database/entities/Author';
import { AuthorFilterDto } from '../../../dto/filters/author-filter.dto';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { BookPaginationFilterDto } from '../../../dto/filters/book-pagination-filter.dto';
import { AuthorPaginationFilterDto } from '../../../dto/filters/author-pagination-filter.dto';

@Controller('authors')
export class AuthorsController {
    constructor(private _authorService: AuthorsService) {}


    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: AuthorDto) {
        item.id = null;
        return this._authorService.save(Object.assign(new Author(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: AuthorDto) {
        return this._authorService.save(Object.assign(new Author(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('/with-deleted')
    findAllWithDeleted(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findAll(filter, true);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('pagination/with-deleted')
    findAllPaginationWithDeleted(@Query() pageOptionsDto: AuthorPaginationFilterDto) {
        return this._authorService.findAllByPagination(pageOptionsDto, true);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('first/with-deleted')
    findOneWithDeleted(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findOne(filter, true);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get(':id/with-deleted')
    findOneByIdWithDeleted(@Param('id', ParseIntPipe) id: number) {
        return this._authorService.findOne({ id }, true);
    }

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findAll(filter);
    }

    @Get('pagination')
    findAllPagination(@Query() pageOptionsDto: AuthorPaginationFilterDto) {
        return this._authorService.findAllByPagination(pageOptionsDto);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._authorService.findOne({ id });
    }
}
