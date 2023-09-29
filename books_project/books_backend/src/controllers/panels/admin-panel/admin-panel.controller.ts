import {
    Body,
    Controller, Get,
    NotFoundException,
    ParseIntPipe,
    Post,
    Put, Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AdminPanelService } from '../../../services/panels/admin-panel/admin-panel.service';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { UserRoleDto } from '../../../dto/user-role.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as process from 'process';
import * as console from 'console';
import { BookEditDto } from '../../../dto/admin-panel/book/book-edit.dto';
import { BookCreateDto } from '../../../dto/admin-panel/book/book-create.dto';
import { BookFilesService } from '../../../database/services/book-files/book-files.service';
import * as fs from 'fs';
import { AuthorCreateDto } from '../../../dto/admin-panel/author/author-create.dto';
import { AuthorEditDto } from '../../../dto/admin-panel/author/author-edit.dto';
import { UserCreateDto } from '../../../dto/admin-panel/user/user-create.dto';
import { UserEditDto } from '../../../dto/admin-panel/user/user-edit.dto';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('admin-panel')
export class AdminPanelController {
    constructor(
        private readonly _adminPanelService: AdminPanelService,
    ) {}

    // добавить данные о пользователе
    @Roles(RolesEnum.admin)
    @Post('user/create')
    async addUser(@Body() userCreateDto: UserCreateDto) {
        return this._adminPanelService.createUser(userCreateDto);
    }

    // изменить данные о пользователе
    @Roles(RolesEnum.admin)
    @Put('user/edit')
    async editUser(@Body() userEditDto: UserEditDto) {
        return this._adminPanelService.editUser(userEditDto);
    }
    
    // изменить данные о пользователе
    @Roles(RolesEnum.admin)
    @Post('user/reset-password')
    async resetPasswordUser(@Body('userId', ParseIntPipe) userId: number) {
        return this._adminPanelService.resetPasswordUser(userId);
    }

    // загрузить файл изображения для пользователя
    @Roles(RolesEnum.admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/user/image')
    async uploadUserImageFile(@UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/public/images/users`, fileName),
        };
    }

    // заблокировать пользователя
    @Roles(RolesEnum.admin)
    @Post('user/block')
    async blockUser(@Body('userId', ParseIntPipe) userId: number) {
        await this._adminPanelService.blockUser(userId);
    }

    // разблокировать пользователя
    @Roles(RolesEnum.admin)
    @Post('user/unblock')
    async unblockUser(@Body('userId', ParseIntPipe) userId: number) {
        await this._adminPanelService.unblockUser(userId);
    }

    // получить роли пользователей
    @Roles(RolesEnum.admin)
    @Post('user/roles')
    async userRoles(@Body('userId', ParseIntPipe) userId: number) {
        return await this._adminPanelService.userRoles(userId);
    }

    // назначить роль пользователя
    @Roles(RolesEnum.admin)
    @Post('user/roles/add')
    async addUserRole(@Body() userRole: UserRoleDto) {
        await this._adminPanelService.addUserRole(userRole);
    }

    // убрать роль пользователя
    @Roles(RolesEnum.admin)
    @Post('user/roles/remove')
    async removeUserRole(@Body() userRole: UserRoleDto) {
        await this._adminPanelService.removeUserRole(userRole);
    }

    // получить список книг в корзине
    @Roles(RolesEnum.admin)
    @Post('user/cart')
    async getUserBooksFromCart(@Body('userId') userId: number) {
        return this._adminPanelService.getUserBooksFromCart(userId);
    }

    // получить список покупок
    @Roles(RolesEnum.admin)
    @Post('user/sales')
    async getUserSales(@Body('userId') userId: number) {
        return this._adminPanelService.getUserSales(userId);
    }

    // добавить данные о книге
    @Roles(RolesEnum.admin)
    @Post('books/create')
    async addBook(@Body() bookCreateDto: BookCreateDto) {
        return this._adminPanelService.createBook(bookCreateDto);
    }

    // изменить данные о книге
    @Roles(RolesEnum.admin)
    @Put('books/edit')
    async editBook(@Body() bookEditDto: BookEditDto) {
        return this._adminPanelService.editBook(bookEditDto);
    }

    // загрузить файл изображения для книги
    @Roles(RolesEnum.admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/book/image')
    async uploadBookImageFile(@UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/public/images/books`, fileName),
        };
    }

    // загрузить файл книги
    @Roles(RolesEnum.admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/book/file')
    async uploadBookFile(@UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/storage/files/books`, fileName),
        };
    }

    // удалить файл книги
    @Roles(RolesEnum.admin)
    @Post('delete/book/file')
    async deleteBookFile(@Body() data: { bookFileId: number }) {
        await this._adminPanelService.deleteBookFile(data.bookFileId);
    }

    // удалить книгу
    @Roles(RolesEnum.admin)
    @Post('delete/book')
    async deleteBook(@Body() data: { bookId: number }) {
        await this._adminPanelService.deleteBook(data.bookId);
    }

    // восстановить книгу
    @Roles(RolesEnum.admin)
    @Post('restore/book')
    async restoreBook(@Body() data: { bookId: number }) {
        await this._adminPanelService.restoreBook(data.bookId);
    }

    // добавить данные об авторе
    @Roles(RolesEnum.admin)
    @Post('authors/create')
    async addAuthor(@Body() bookCreateDto: AuthorCreateDto) {
        return this._adminPanelService.createAuthor(bookCreateDto);
    }

    // изменить данные об авторе
    @Roles(RolesEnum.admin)
    @Put('authors/edit')
    async editAuthor(@Body() bookEditDto: AuthorEditDto) {
        return this._adminPanelService.editAuthor(bookEditDto);
    }

    // загрузить файл изображения для книги
    @Roles(RolesEnum.admin)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload/author/image')
    async uploadAuthorImageFile(@UploadedFile() file: Express.Multer.File, @Body('fileName') fileName: string) {
        return {
            fileName: await this._adminPanelService
                .uploadFile(file, `${process.cwd()}/public/images/authors`, fileName),
        };
    }

    // удалить автора
    @Roles(RolesEnum.admin)
    @Post('delete/author')
    async deleteAuthor(@Body() data: { authorId: number }) {
        await this._adminPanelService.deleteAuthor(data.authorId);
    }

    // восстановить автора
    @Roles(RolesEnum.admin)
    @Post('restore/author')
    async restoreAuthor(@Body() data: { authorId: number }) {
        await this._adminPanelService.restoreAuthor(data.authorId);
    }
}
