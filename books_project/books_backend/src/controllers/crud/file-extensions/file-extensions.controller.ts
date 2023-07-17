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
import { FileExtensionsService } from '../../../database/services/file-extensions/file-extensions.service';
import { FileExtensionFilterDto } from '../../../dto/filters/file-extension-filter.dto';
import { FileExtensionDto } from '../../../dto/crud/file-extension.dto';
import { FileExtension } from '../../../database/entities/FileExtension';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('file-extensions')
export class FileExtensionsController {
    constructor(private _fileExtensionsService: FileExtensionsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: FileExtensionFilterDto) {
        return this._fileExtensionsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: FileExtensionFilterDto) {
        return this._fileExtensionsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._fileExtensionsService.findOne({ id });
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: FileExtensionDto) {
        item.id = null;
        return this._fileExtensionsService.save(Object.assign(new FileExtension(), item));
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: FileExtensionDto) {
        return this._fileExtensionsService.save(Object.assign(new FileExtension(), item));
    }
}
