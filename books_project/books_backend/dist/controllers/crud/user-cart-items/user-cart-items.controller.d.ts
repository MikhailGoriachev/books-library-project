import { UserCartItemsService } from '../../../database/services/user-cart-items/user-cart-items.service';
import { UserCartItemFilterDto } from '../../../dto/filters/user-cart-item-filter.dto';
import { UserCartItemDto } from '../../../dto/crud/user-cart-item.dto';
import { UserCartItem } from '../../../database/entities/UserCartItem';
export declare class UserCartItemsController {
    private _userCartItemsService;
    constructor(_userCartItemsService: UserCartItemsService);
    findAll(filter: UserCartItemFilterDto): Promise<UserCartItem[]>;
    findOne(filter: UserCartItemFilterDto): Promise<UserCartItem>;
    findOneById(id: number): Promise<UserCartItem>;
    create(item: UserCartItemDto): Promise<UserCartItem>;
    update(item: UserCartItemDto): Promise<UserCartItem>;
}
