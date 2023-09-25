import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { GuestPanelService } from '../../../services/panels/guest-panel/guest-panel.service';
import * as process from 'process';

@Controller('guest-panel')
export class GuestPanelController {
    constructor(private readonly _guestPanelService: GuestPanelService) {}
    
    // запись просмотра книги в статистику
    @Post('view/book')
    async setBookView(@Body('bookId', ParseIntPipe) bookId: number) {
        await this._guestPanelService.setBookView(bookId);
    }

    // запись просмотра автора в статистику
    @Post('view/author')
    async setAuthorView(@Body('authorId', ParseIntPipe) authorId: number) {
        await this._guestPanelService.setAuthorView(authorId);
    }

    // запись просмотра категории в статистику
    @Post('view/category')
    async setCategoryView(@Body('categoryId', ParseIntPipe) categoryId: number) {
        await this._guestPanelService.setCategoryView(categoryId);
    }
}
