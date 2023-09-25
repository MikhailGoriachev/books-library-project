import { Module } from '@nestjs/common';
import { UserPanelService } from './panels/user-panel/user-panel.service';
import { AdminPanelService } from './panels/admin-panel/admin-panel.service';
import { DatabaseModule } from '../database/database.module';
import { ApiConfigService } from './api-config/api-config.service';
import { GuestPanelService } from './panels/guest-panel/guest-panel.service';

@Module({
    imports: [DatabaseModule],
    providers: [ApiConfigService, UserPanelService, AdminPanelService, GuestPanelService],
    exports: [ApiConfigService, UserPanelService, AdminPanelService, GuestPanelService]
})
export class ServicesModule {}
