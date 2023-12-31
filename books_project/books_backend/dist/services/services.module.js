"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const user_panel_service_1 = require("./panels/user-panel/user-panel.service");
const admin_panel_service_1 = require("./panels/admin-panel/admin-panel.service");
const database_module_1 = require("../database/database.module");
const api_config_service_1 = require("./api-config/api-config.service");
const guest_panel_service_1 = require("./panels/guest-panel/guest-panel.service");
const auth_module_1 = require("../auth/auth.module");
const mail_module_1 = require("../mail/mail.module");
const books_reports_service_1 = require("./reports/books-reports/books-reports.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../database/data-source");
const date_service_1 = require("./date/date.service");
const authors_reports_service_1 = require("./reports/authors-reports/authors-reports.service");
const users_reports_service_1 = require("./reports/users-reports/users-reports.service");
const categories_reports_service_1 = require("./reports/categories-reports/categories-reports.service");
let ServicesModule = exports.ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule, mail_module_1.MailModule,
            typeorm_1.TypeOrmModule.forFeature(data_source_1.AppDataSource.options.entities),
        ],
        providers: [
            api_config_service_1.ApiConfigService,
            user_panel_service_1.UserPanelService,
            admin_panel_service_1.AdminPanelService,
            guest_panel_service_1.GuestPanelService,
            books_reports_service_1.BooksReportsService,
            date_service_1.DateService,
            authors_reports_service_1.AuthorsReportsService,
            users_reports_service_1.UsersReportsService,
            categories_reports_service_1.CategoriesReportsService
        ],
        exports: [
            api_config_service_1.ApiConfigService,
            user_panel_service_1.UserPanelService,
            admin_panel_service_1.AdminPanelService,
            guest_panel_service_1.GuestPanelService,
            books_reports_service_1.BooksReportsService,
            date_service_1.DateService,
            authors_reports_service_1.AuthorsReportsService,
            users_reports_service_1.UsersReportsService,
            categories_reports_service_1.CategoriesReportsService
        ],
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map