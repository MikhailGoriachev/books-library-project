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

@Controller('authors')
export class AuthorsController {
    constructor(private _authorService: AuthorsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: AuthorFilterDto) {
        return this._authorService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._authorService.findOne({ id });
    }

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
}
