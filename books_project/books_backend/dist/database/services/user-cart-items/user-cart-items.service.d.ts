import { UserCartItem } from '../../entities/UserCartItem';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { Book } from '../../entities/Book';
import { UserCartItemFilterDto } from '../../../dto/filters/user-cart-item-filter.dto';
export declare class UserCartItemsService {
    private cartItemRepository;
    private userRepository;
    private bookRepository;
    constructor(cartItemRepository: Repository<UserCartItem>, userRepository: Repository<User>, bookRepository: Repository<Book>);
    findAll(filter?: UserCartItemFilterDto): Promise<UserCartItem[]>;
    findOne(filter?: UserCartItemFilterDto): Promise<UserCartItem>;
    private getFilter;
    save(item: UserCartItem): Promise<UserCartItem>;
    remove(id: number): Promise<any>;
    removeAll(cartItems: UserCartItem[]): Promise<any>;
}
