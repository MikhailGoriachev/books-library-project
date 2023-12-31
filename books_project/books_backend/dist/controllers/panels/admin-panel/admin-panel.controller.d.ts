/// <reference types="multer" />
import { AdminPanelService } from '../../../services/panels/admin-panel/admin-panel.service';
import { UserRoleDto } from '../../../dto/user-role.dto';
import { BookEditDto } from '../../../dto/admin-panel/book/book-edit.dto';
import { BookCreateDto } from '../../../dto/admin-panel/book/book-create.dto';
import { AuthorCreateDto } from '../../../dto/admin-panel/author/author-create.dto';
import { AuthorEditDto } from '../../../dto/admin-panel/author/author-edit.dto';
import { UserCreateDto } from '../../../dto/admin-panel/user/user-create.dto';
import { UserEditDto } from '../../../dto/admin-panel/user/user-edit.dto';
export declare class AdminPanelController {
    private readonly _adminPanelService;
    constructor(_adminPanelService: AdminPanelService);
    addUser(userCreateDto: UserCreateDto): Promise<void>;
    editUser(userEditDto: UserEditDto): Promise<import("../../../database/entities/User").User>;
    resetPasswordUser(userId: number): Promise<void>;
    uploadUserImageFile(file: Express.Multer.File, fileName: string): Promise<{
        fileName: string;
    }>;
    blockUser(userId: number): Promise<void>;
    unblockUser(userId: number): Promise<void>;
    userRoles(userId: number): Promise<import("../../../database/entities/Role").Role[]>;
    addUserRole(userRole: UserRoleDto): Promise<void>;
    removeUserRole(userRole: UserRoleDto): Promise<void>;
    getUserBooksFromCart(userId: number): Promise<import("../../../database/entities/Book").Book[]>;
    getUserSales(userId: number): Promise<import("../../../database/entities/Sale").Sale[]>;
    addBook(bookCreateDto: BookCreateDto): Promise<import("../../../database/entities/Book").Book>;
    editBook(bookEditDto: BookEditDto): Promise<import("../../../database/entities/Book").Book>;
    uploadBookImageFile(file: Express.Multer.File, fileName: string): Promise<{
        fileName: string;
    }>;
    uploadBookFile(file: Express.Multer.File, fileName: string): Promise<{
        fileName: string;
    }>;
    deleteBookFile(data: {
        bookFileId: number;
    }): Promise<void>;
    deleteBook(data: {
        bookId: number;
    }): Promise<void>;
    restoreBook(data: {
        bookId: number;
    }): Promise<void>;
    addAuthor(bookCreateDto: AuthorCreateDto): Promise<import("../../../database/entities/Author").Author>;
    editAuthor(bookEditDto: AuthorEditDto): Promise<import("../../../database/entities/Author").Author>;
    uploadAuthorImageFile(file: Express.Multer.File, fileName: string): Promise<{
        fileName: string;
    }>;
    deleteAuthor(data: {
        authorId: number;
    }): Promise<void>;
    restoreAuthor(data: {
        authorId: number;
    }): Promise<void>;
}
