import { Module } from '@nestjs/common';
import { UserPanelService } from './panels/user-panel/user-panel.service';
import { AdminPanelService } from './panels/admin-panel/admin-panel.service';
import { DatabaseModule } from '../database/database.module';
import { ApiConfigService } from './api-config/api-config.service';

@Module({
    imports: [DatabaseModule],
    providers: [ApiConfigService, UserPanelService, AdminPanelService],
    exports: [ApiConfigService, UserPanelService, AdminPanelService]
})
export class ServicesModule {}
