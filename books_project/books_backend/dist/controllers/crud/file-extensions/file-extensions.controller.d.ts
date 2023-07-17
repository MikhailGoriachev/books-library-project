import { FileExtensionsService } from '../../../database/services/file-extensions/file-extensions.service';
import { FileExtensionFilterDto } from '../../../dto/filters/file-extension-filter.dto';
import { FileExtensionDto } from '../../../dto/crud/file-extension.dto';
import { FileExtension } from '../../../database/entities/FileExtension';
export declare class FileExtensionsController {
    private _fileExtensionsService;
    constructor(_fileExtensionsService: FileExtensionsService);
    findAll(filter: FileExtensionFilterDto): Promise<FileExtension[]>;
    findOne(filter: FileExtensionFilterDto): Promise<FileExtension>;
    findOneById(id: number): Promise<FileExtension>;
    create(item: FileExtensionDto): Promise<FileExtension>;
    update(item: FileExtensionDto): Promise<FileExtension>;
}
