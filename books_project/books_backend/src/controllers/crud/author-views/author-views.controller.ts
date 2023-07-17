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
import { AuthorViewsService } from '../../../database/services/author-views/author-views.service';
import { AuthorViewDto } from '../../../dto/crud/author-view.dto';
import { AuthorView } from '../../../database/entities/AuthorView';
import { AuthorViewFilterDto } from '../../../dto/filters/author-view-filter.dto';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@Controller('author-views')
export class AuthorViewsController {
    constructor(private _authorViewsService: AuthorViewsService) {}

    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: AuthorViewFilterDto) {
        return this._authorViewsService.findAll(filter);
    }

    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: AuthorViewFilterDto) {
        return this._authorViewsService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._authorViewsService.findOne({ id });
    }
    
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Post()
    create(@Body() item: AuthorViewDto) {
        item.id = null;
        return this._authorViewsService.save(Object.assign(new AuthorView(), item));
    }
    
    @UseGuards(RolesGuard)
    @Roles(RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Put()
    update(@Body() item: AuthorViewDto) {
        return this._authorViewsService.save(Object.assign(new AuthorView(), item));
    }
}
