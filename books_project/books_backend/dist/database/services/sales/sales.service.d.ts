import { Repository } from 'typeorm';
import { Sale } from '../../entities/Sale';
import { SaleFilterDto } from '../../../dto/filters/sale-filter.dto';
import { User } from '../../entities/User';
import { Book } from '../../entities/Book';
export declare class SalesService {
    private saleRepository;
    private userRepository;
    private bookRepository;
    constructor(saleRepository: Repository<Sale>, userRepository: Repository<User>, bookRepository: Repository<Book>);
    findAll(filter?: SaleFilterDto): Promise<Sale[]>;
    findOne(filter?: SaleFilterDto): Promise<Sale>;
    private getFilter;
    save(item: Sale): Promise<Sale>;
    saveAll(item: Sale[]): Promise<Sale[]>;
}
