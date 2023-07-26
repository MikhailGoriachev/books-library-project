import { UserPanelService } from '../../../services/panels/user-panel/user-panel.service';
import { SetBookRatingDto } from '../../../dto/auth/set-book-rating.dto';
export declare class UserPanelController {
    private _userPanelService;
    constructor(_userPanelService: UserPanelService);
    addBookToCart(req: any, bookId: number): Promise<void>;
    removeBookFromCart(req: any, bookId: number): Promise<void>;
    clearCart(req: any): Promise<void>;
    getBooksFromCart(req: any): Promise<import("../../../database/entities/Book").Book[]>;
    setBookRating(req: any, rating: SetBookRatingDto): Promise<void>;
    removeBookRating(req: any, bookId: number): Promise<void>;
    setBookView(req: any, bookId: number): Promise<void>;
    setAuthorView(req: any, authorId: number): Promise<void>;
    setCategoryView(req: any, categoryId: number): Promise<void>;
    downloadBook(req: any, bookFileId: number): Promise<import("@nestjs/common").StreamableFile>;
}
