import { ConfigService } from '@nestjs/config';
export declare class ApiConfigService {
    private _configService;
    constructor(_configService: ConfigService);
    get jwtAccessSecret(): string;
    get jwtRefreshSecret(): string;
    get jwtAccessExpiry(): string;
    get jwtRefreshExpiry(): string;
    get storagePath(): string;
    get storageBookFilesPath(): string;
}
