import {
    Body,
    Controller,
    Get, NotFoundException,
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
import { FileExtensionsService } from '../../../database/services/file-extensions/file-extensions.service';
import { BooksService } from '../../../database/services/books/books.service';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('book-files')
export class BookFilesController {
    constructor(
        private _bookFilesService: BookFilesService,
        private _booksService: BooksService,
        private _fileExtensionsService: FileExtensionsService,
    ) {}

    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: BookFileFilterDto) {
        return this._bookFilesService.findAll(filter, true);
    }

    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: BookFileFilterDto) {
        return this._bookFilesService.findOne(filter, true);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._bookFilesService.findOne({ id }, true);
    }

    @Roles(RolesEnum.admin)
    @Post()
    async create(@Body() item: BookFileDto) {
        item.id = null;
        const bookFile = new BookFile(
            item.path,
            await this._fileExtensionsService.findOne({ id: item.fileExtensionId }),
            await this._booksService.findOne({ id: item.bookId }, true),
        );

        return this._bookFilesService.save(bookFile);
    }

    @Roles(RolesEnum.admin)
    @Put()
    async update(@Body() item: BookFileDto) {
        const bookFile = new BookFile(
            item.path,
            await this._fileExtensionsService.findOne({ id: item.fileExtensionId }),
            await this._booksService.findOne({ id: item.bookId }, true),
        );

        bookFile.id = item.id;
        
        return this._bookFilesService.save(bookFile);
    }
}
