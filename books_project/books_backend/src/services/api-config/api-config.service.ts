import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Injectable()
export class ApiConfigService {
    constructor(private _configService: ConfigService) {}

    get jwtAccessSecret(): string {
        return this._configService.get('JWT_ACCESS_SECRET');
    }

    get jwtRefreshSecret(): string {
        return this._configService.get('JWT_REFRESH_SECRET');
    }

    get jwtAccessExpiry(): string {
        return this._configService.get('JWT_ACCESS_TOKEN_EXPIRY');
    }

    get jwtRefreshExpiry(): string {
        return this._configService.get('JWT_REFRESH_TOKEN_EXPIRY');
    }

    get storagePath(): string {
        return join(process.cwd() + this._configService.get('STORAGE_PATH'));
    }

    get storageBookFilesPath(): string {
        return join(process.cwd(), this._configService.get('STORAGE_BOOK_FILES_PATH'));
    }
}
