/// <reference types="multer" />
import { UserPanelService } from '../../../services/panels/user-panel/user-panel.service';
import { User } from '../../../database/entities/User';
import { SetBookRatingDto } from '../../../dto/auth/set-book-rating.dto';
import { UserEditProfileDto } from '../../../dto/user-panel/user-edit-profile.dto';
import { UserPasswordEditDto } from '../../../dto/user-panel/user-password-edit.dto';
export declare class UserPanelController {
    private _userPanelService;
    constructor(_userPanelService: UserPanelService);
    addBookToCart(req: any, bookId: number): Promise<void>;
    removeBookFromCart(req: any, bookId: number): Promise<void>;
    clearCart(req: any): Promise<void>;
    getBooksFromCart(req: any): Promise<import("../../../database/entities/Book").Book[]>;
    setBookRating(req: any, rating: SetBookRatingDto): Promise<import("../../../database/entities/BookRating").BookRating>;
    removeBookRating(req: any, bookId: number): Promise<void>;
    getBookRating(req: any, bookId: number): Promise<void | import("../../../database/entities/BookRating").BookRating>;
    setBookView(req: any, bookId: number): Promise<void>;
    setAuthorView(req: any, authorId: number): Promise<void>;
    setCategoryView(req: any, categoryId: number): Promise<void>;
    downloadBook(req: any, res: any, bookFileId: number): Promise<import("@nestjs/common").StreamableFile>;
    getSales(req: any): Promise<import("../../../database/entities/Sale").Sale[]>;
    buy(req: any): Promise<import("../../../database/entities/Sale").Sale[]>;
    profileEdit(req: any, userEditProfileDto: UserEditProfileDto): Promise<User>;
    passwordEdit(req: any, userPasswordEditDto: UserPasswordEditDto): Promise<{
        result: boolean;
    }>;
    uploadUserImageFile(request: any, file: Express.Multer.File, fileName: string): Promise<{
        fileName: string;
    }>;
}
