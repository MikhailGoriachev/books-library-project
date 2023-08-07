import { Injectable } from '@angular/core';
import { FileExtension } from "../../../../entities/FileExtension";
import { ApiService } from "../../api.service";
import { map } from "rxjs";
import { FileExtensionFilterDto } from "../../../../dto/filters/file-extension-filter.dto";
import { FileExtensionDto } from "../../../../dto/crud/file-extension.dto";

@Injectable({
    providedIn: 'root'
})
export class FileExtensionsApiService {
    private static readonly basePath = 'file-extensions/';

    constructor(private readonly _apiService: ApiService) { }

    findAll(filter?: FileExtensionFilterDto) {
        return this._apiService.get(FileExtensionsApiService.basePath, filter)
            .pipe(map((data: Partial<FileExtension>[]) => data.map(a => FileExtension.assign(new FileExtension(), a))));
    }

    findOne(filter?: FileExtensionFilterDto) {
        return this._apiService.get(FileExtensionsApiService.basePath + '/first', filter)
            .pipe(map(data => FileExtension.assign(new FileExtension(), data)));
    }

    findOneById(id: number) {
        return this._apiService.get(FileExtensionsApiService.basePath + `/${id}`)
            .pipe(map(data => FileExtension.assign(new FileExtension(), data)));
    }

    create(item: FileExtension) {
        const dto = new FileExtensionDto(0, item.name);
        return this._apiService.post(FileExtensionsApiService.basePath, item);
    }

    update(item: FileExtension) {
        const dto = new FileExtensionDto(item.id, item.name);
        return this._apiService.put(FileExtensionsApiService.basePath, item);
    }
}
