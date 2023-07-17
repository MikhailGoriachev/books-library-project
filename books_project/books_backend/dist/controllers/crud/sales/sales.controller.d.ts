import { SalesService } from '../../../database/services/sales/sales.service';
import { SaleFilterDto } from '../../../dto/filters/sale-filter.dto';
import { Sale } from '../../../database/entities/Sale';
import { SaleDto } from '../../../dto/crud/sale.dto';
export declare class SalesController {
    private _salesService;
    constructor(_salesService: SalesService);
    findAll(filter: SaleFilterDto): Promise<Sale[]>;
    findOne(filter: SaleFilterDto): Promise<Sale>;
    findOneById(id: number): Promise<Sale>;
    create(item: SaleDto): Promise<Sale>;
    update(item: SaleDto): Promise<Sale>;
}
