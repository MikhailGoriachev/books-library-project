import { FileExtension } from '../../entities/FileExtension';
import { Repository } from 'typeorm';
import { FileExtensionFilterDto } from '../../../dto/filters/file-extension-filter.dto';
export declare class FileExtensionsService {
    private fileExtensionRepository;
    constructor(fileExtensionRepository: Repository<FileExtension>);
    findAll(filter?: FileExtensionFilterDto): Promise<FileExtension[]>;
    findOne(filter?: FileExtensionFilterDto): Promise<FileExtension>;
    private getFilter;
    save(item: FileExtension): Promise<FileExtension>;
}
