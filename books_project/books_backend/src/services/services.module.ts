import { Module } from '@nestjs/common';
import { UserPanelService } from './panels/user-panel/user-panel.service';
import { AdminPanelService } from './panels/admin-panel/admin-panel.service';
import { DatabaseModule } from '../database/database.module';
import { ApiConfigService } from './api-config/api-config.service';
import { GuestPanelService } from './panels/guest-panel/guest-panel.service';
import { AuthModule } from '../auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { BooksReportsService } from './reports/books-reports/books-reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../database/data-source';
import { EntitySchema } from 'typeorm';
import { DateService } from './date/date.service';
import { AuthorsReportsService } from './reports/authors-reports/authors-reports.service';
import { UsersReportsService } from './reports/users-reports/users-reports.service';
import { CategoriesReportsService } from './reports/categories-reports/categories-reports.service';

@Module({
    imports: [DatabaseModule, AuthModule, MailModule,
        TypeOrmModule.forFeature(AppDataSource.options.entities as EntitySchema[]),
    ],
    providers: [
        ApiConfigService,
        UserPanelService,
        AdminPanelService,
        GuestPanelService,
        BooksReportsService,
        DateService,
        AuthorsReportsService,
        UsersReportsService,
        CategoriesReportsService
    ],
    exports: [
        ApiConfigService,
        UserPanelService,
        AdminPanelService,
        GuestPanelService,
        BooksReportsService,
        DateService,
        AuthorsReportsService,
        UsersReportsService,
        CategoriesReportsService
    ],
})
export class ServicesModule {}
