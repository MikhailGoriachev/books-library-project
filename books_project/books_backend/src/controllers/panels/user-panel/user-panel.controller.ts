import {
    Body,
    Controller,
    Get, Header,
    HttpCode,
    HttpException,
    ParseIntPipe,
    Post,
    Request, Res,
    Response, UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { UserPanelService } from '../../../services/panels/user-panel/user-panel.service';
import { UserCartItemDto } from '../../../dto/crud/user-cart-item.dto';
import { User } from '../../../database/entities/User';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { SetBookRatingDto } from '../../../dto/auth/set-book-rating.dto';
import { UserEditProfileDto } from '../../../dto/user-panel/user-edit-profile.dto';
import { UserPasswordEditDto } from '../../../dto/user-panel/user-password-edit.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Get('cart/clear')
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
        return await this._userPanelService.setBookRating(req.user, rating);
    }

    // удалить оценку книги
    @Roles(RolesEnum.user)
    @Post('book/rating/remove')
    async removeBookRating(@Request() req, @Body('bookId', ParseIntPipe) bookId: number) {
        await this._userPanelService.removeBookRating(req.user, bookId);
    }

    // получить оценку книги
    @Roles(RolesEnum.user)
    @Post('book/rating')
    async getBookRating(@Request() req, @Body('bookId', ParseIntPipe) bookId: number) {
        return await this._userPanelService.getBookRating(req.user, bookId);
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
    @Post('book/download')
    async downloadBook(@Request() req,
                       @Res({ passthrough: true }) res,
                       @Body('bookFileId', ParseIntPipe) bookFileId: number) {
        const data = await this._userPanelService.downloadBook(req.user, bookFileId);

        res.set({
            // 'Content-Type': 'application/json',
            // 'Content-Disposition': 'attachment; filename="package.json"',
            'Access-Control-Expose-Headers': 'Content-Disposition'
        });

        return data;
    }

    // получить список покупок
    @Roles(RolesEnum.user)
    @Get('sales')
    async getSales(@Request() req) {
        return this._userPanelService.getSales(req.user);
    }

    // купить книгу
    @Roles(RolesEnum.user)
    @Get('buy')
    async buy(@Request() req) {
        return this._userPanelService.buy(req.user);
    }
    
    // изменить данные профиля
    @Roles(RolesEnum.user)
    @Post('profile/edit')
    async profileEdit(@Request() req, @Body() userEditProfileDto: UserEditProfileDto) {
        return this._userPanelService.profileEdit(req.user, userEditProfileDto);
    }
    
    // заменить пароль
    @Roles(RolesEnum.user)
    @Post('profile/password-edit')
    async passwordEdit(@Request() req, @Body() userPasswordEditDto: UserPasswordEditDto) {
        return this._userPanelService.passwordEdit(req.user, userPasswordEditDto);
    }
    
    // загрузить файл изображения для пользователя
    @Roles(RolesEnum.user)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/profile/image')
    async uploadUserImageFile(@Request() request, @UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string) {
        return {
            fileName: await this._userPanelService
                .uploadUserImageFile(request.user, file),
        };
    }
}
