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
import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import { BookFileFilterDto } from '../../../dto/filters/book-file-filter.dto';
import { BookFileDto } from '../../../dto/crud/book-file.dto';
import { BookFile } from '../../../database/entities/BookFile';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('book-files')
export class BookFilesController {
    constructor(private _bookFilesService: BookFilesService) {}

    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookFileFilterDto) {
        return this._bookFilesService.findAll(filter);
    }

    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookFileFilterDto) {
        return this._bookFilesService.findOne(filter);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._bookFilesService.findOne({ id });
    }

    @Roles(RolesEnum.admin)
    @Post()
    create(@Body() item: BookFileDto) {
        item.id = null;
        return this._bookFilesService.save(Object.assign(new BookFile(), item));
    }

    @Roles(RolesEnum.admin)
    @Put()
    update(@Body() item: BookFileDto) {
        return this._bookFilesService.save(Object.assign(new BookFile(), item));
    }
}
