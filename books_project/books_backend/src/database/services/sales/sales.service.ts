import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getBetween, getDateBetween, getLike } from '../../../infrastructure/utils';
import { Sale } from '../../entities/Sale';
import { SaleFilterDto } from '../../../dto/filters/sale-filter.dto';
import { User } from '../../entities/User';
import { Book } from '../../entities/Book';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)
        private saleRepository: Repository<Sale>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) {}

    async findAll(filter?: SaleFilterDto): Promise<Sale[]> {
        return this.saleRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: SaleFilterDto): Promise<Sale> {
        return this.saleRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: SaleFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['user'] = this.userRepository.findOneBy({ id: filter.userId });
        fields['book'] = this.bookRepository.findOneBy({ id: filter.bookId });
        fields['price'] = filter.price ?? getBetween(filter.minPrice, filter.maxPrice);
        fields['saleAt'] = filter.saleAt ?? getDateBetween(filter.minSaleAt, filter.maxSaleAt);

        return fields;
    }

    async save(item: Sale): Promise<Sale> {
        return this.saleRepository.save(item);
    }
}
