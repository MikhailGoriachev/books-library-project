import { Body, Controller, Get, HttpCode, HttpException, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { UserPanelService } from '../../../services/panels/user-panel/user-panel.service';
import { UserCartItemDto } from '../../../dto/crud/user-cart-item.dto';
import { User } from '../../../database/entities/User';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { SetBookRatingDto } from '../../../dto/auth/set-book-rating.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('user-panel')
export class UserPanelController {
    constructor(private _userPanelService: UserPanelService) {}

    // добавить книгу в корзину
    @Roles(RolesEnum.user)
    @Post('cart/add-book')
    async addBookToCart(@Request() req,
                        @Body('bookId', ParseIntPipe) bookId: number) {
        await this._userPanelService.addBookToCart(req.user, bookId);
    }

    // удалить книгу из корзины
    @Roles(RolesEnum.user)
    @Post('cart/remove-book')
    async removeBookFromCart(@Request() req,
                             @Body('bookId', ParseIntPipe) bookId: number) {
        await this._userPanelService.removeBookFromCart(req.user, bookId);
    }

    // очистить корзину
    @Roles(RolesEnum.user)
    @Post('cart/clear')
    async clearCart(@Request() req) {
        await this._userPanelService.clearCart(req.user);
    }

    // получить список книг в корзине
    @Roles(RolesEnum.user)
    @Get('cart')
    async getBooksFromCart(@Request() req) {
        return await this._userPanelService.getBooksFromCart(req.user);
    }

    // установить оценку книги
    @Roles(RolesEnum.user)
    @Post('book/rating/set')
    async setBookRating(@Request() req, @Body() rating: SetBookRatingDto) {
        await this._userPanelService.setBookRating(req.user, rating);
    }

    // удалить оценку книги
    @Roles(RolesEnum.user)
    @Post('book/rating/remove')
    async removeBookRating(@Request() req, @Body('bookId', ParseIntPipe) bookId: number) {
        await this._userPanelService.removeBookRating(req.user, bookId);
    }

    // запись просмотра книги в статистику
    @Roles(RolesEnum.user)
    @Post('view/book')
    async setBookView(@Request() req, @Body('bookId', ParseIntPipe) bookId: number) {
        await this._userPanelService.setBookView(req.user, bookId);
    }

    // запись просмотра автора в статистику
    @Roles(RolesEnum.user)
    @Post('view/author')
    async setAuthorView(@Request() req, @Body('authorId', ParseIntPipe) authorId: number) {
        await this._userPanelService.setAuthorView(req.user, authorId);
    }

    // запись просмотра категории в статистику
    @Roles(RolesEnum.user)
    @Post('view/category')
    async setCategoryView(@Request() req, @Body('categoryId', ParseIntPipe) categoryId: number) {
        await this._userPanelService.setCategoryView(req.user, categoryId);
    }
    
    // скачать купленную книгу
    @Roles(RolesEnum.user)
    @Get('book/download')
    async downloadBook(@Request() req, @Body('bookFileId', ParseIntPipe) bookFileId: number) {
    // async downloadBook(@Request() req) {
        return await this._userPanelService.downloadBook(req.user, 5);
    }
}
