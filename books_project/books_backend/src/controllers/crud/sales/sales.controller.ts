import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { SalesService } from '../../../database/services/sales/sales.service';
import { SaleFilterDto } from '../../../dto/filters/sale-filter.dto';
import { Sale } from '../../../database/entities/Sale';
import { SaleDto } from '../../../dto/crud/sale.dto';
import { RolesGuard } from '../../../guards/roles/roles.guard';
import { Roles } from '../../../decorators/roles/roles.decorator';
import { RolesEnum } from '../../../infrastructure/RolesEnum';
import { JwtAccessAuthGuard } from '../../../auth/guards/jwt-access-auth.guard';

@UseGuards(RolesGuard)
@UseGuards(JwtAccessAuthGuard)
@Controller('sales')
export class SalesController {
    constructor(private _salesService: SalesService) {}

    @Roles(RolesEnum.admin)
    @Get()
    findAll(@Query(new ValidationPipe({ transform: true })) filter: SaleFilterDto) {
        return this._salesService.findAll(filter);
    }

    @Roles(RolesEnum.admin)
    @Get('first')
    findOne(@Query(new ValidationPipe({ transform: true })) filter: SaleFilterDto) {
        return this._salesService.findOne(filter);
    }

    @Roles(RolesEnum.admin)
    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._salesService.findOne({ id });
    }
    
    @Roles(RolesEnum.admin)
    @Post()
    create(@Body() item: SaleDto) {
        item.id = null;
        return this._salesService.save(Object.assign(new Sale(), item));
    }

    @Roles(RolesEnum.admin)
    @Put()
    update(@Body() item: SaleDto) {
        return this._salesService.save(Object.assign(new Sale(), item));
    }
}
