import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileExtension } from '../../entities/FileExtension';
import { Repository } from 'typeorm';
import { getLike } from '../../../infrastructure/utils';
import { FileExtensionFilterDto } from '../../../dto/filters/file-extension-filter.dto';

@Injectable()
export class FileExtensionsService {
    constructor(
        @InjectRepository(FileExtension)
        private fileExtensionRepository: Repository<FileExtension>,
    ) {}

    async findAll(filter?: FileExtensionFilterDto): Promise<FileExtension[]> {
        return this.fileExtensionRepository.find({ where: this.getFilter(filter) });
    }

    async findOne(filter?: FileExtensionFilterDto): Promise<FileExtension> {
        return this.fileExtensionRepository.findOne({ where: this.getFilter(filter) });
    }

    // получить фильтр по полям
    private getFilter(filter?: FileExtensionFilterDto): object {
        const fields = {};

        fields['id'] = filter.id;
        fields['name'] = getLike(filter.name);

        return fields;
    }

    async save(item: FileExtension): Promise<FileExtension> {
        return this.fileExtensionRepository.save(item);
    }
}
