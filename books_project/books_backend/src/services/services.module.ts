import { Module } from '@nestjs/common';
import { UserPanelService } from './panels/user-panel/user-panel.service';
import { AdminPanelService } from './panels/admin-panel/admin-panel.service';
import { DatabaseModule } from '../database/database.module';
import { ApiConfigService } from './api-config/api-config.service';
import { GuestPanelService } from './panels/guest-panel/guest-panel.service';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { BookReportsService } from './reports/book-reports/book-reports.service';

@Module({
    imports: [DatabaseModule, AuthModule, MailModule],
    providers: [ApiConfigService, UserPanelService, AdminPanelService, GuestPanelService, BookReportsService],
    exports: [ApiConfigService, UserPanelService, AdminPanelService, GuestPanelService]
})
export class ServicesModule {}
