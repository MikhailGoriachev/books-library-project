"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./crud/users/users.controller");
const books_controller_1 = require("./crud/books/books.controller");
const authors_controller_1 = require("./crud/authors/authors.controller");
const database_module_1 = require("../database/database.module");
const author_views_controller_1 = require("./crud/author-views/author-views.controller");
const blocked_users_controller_1 = require("./crud/blocked-users/blocked-users.controller");
const book_files_controller_1 = require("./crud/book-files/book-files.controller");
const book_ratings_controller_1 = require("./crud/book-ratings/book-ratings.controller");
const book_views_controller_1 = require("./crud/book-views/book-views.controller");
const categories_controller_1 = require("./crud/categories/categories.controller");
const category_views_controller_1 = require("./crud/category-views/category-views.controller");
const file_extensions_controller_1 = require("./crud/file-extensions/file-extensions.controller");
const roles_controller_1 = require("./crud/roles/roles.controller");
const sales_controller_1 = require("./crud/sales/sales.controller");
const user_cart_items_controller_1 = require("./crud/user-cart-items/user-cart-items.controller");
const user_passwords_controller_1 = require("./crud/user-passwords/user-passwords.controller");
const user_panel_controller_1 = require("./panels/user-panel/user-panel.controller");
const admin_panel_controller_1 = require("./panels/admin-panel/admin-panel.controller");
const author_view_statistics_controller_1 = require("./crud/author-view-statistics/author-view-statistics.controller");
const book_rating_statistics_controller_1 = require("./crud/book-rating-statistics/book-rating-statistics.controller");
const category_view_statistics_controller_1 = require("./crud/category-view-statistics/category-view-statistics.controller");
const book_view_statistics_controller_1 = require("./crud/book-view-statistics/book-view-statistics.controller");
const services_module_1 = require("../services/services.module");
const guest_panel_controller_1 = require("./panels/guest-panel/guest-panel.controller");
let ControllersModule = exports.ControllersModule = class ControllersModule {
};
exports.ControllersModule = ControllersModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            users_controller_1.UsersController,
            books_controller_1.BooksController,
            authors_controller_1.AuthorsController,
            author_views_controller_1.AuthorViewsController,
            author_view_statistics_controller_1.AuthorViewStatisticsController,
            blocked_users_controller_1.BlockedUsersController,
            book_files_controller_1.BookFilesController,
            book_ratings_controller_1.BookRatingsController,
            book_rating_statistics_controller_1.BookRatingStatisticsController,
            book_views_controller_1.BookViewsController,
            book_view_statistics_controller_1.BookViewStatisticsController,
            categories_controller_1.CategoriesController,
            category_views_controller_1.CategoryViewsController,
            category_view_statistics_controller_1.CategoryViewStatisticsController,
            file_extensions_controller_1.FileExtensionsController,
            roles_controller_1.RolesController,
            sales_controller_1.SalesController,
            user_cart_items_controller_1.UserCartItemsController,
            user_passwords_controller_1.UserPasswordsController,
            user_panel_controller_1.UserPanelController,
            admin_panel_controller_1.AdminPanelController,
            guest_panel_controller_1.GuestPanelController,
        ],
        imports: [database_module_1.DatabaseModule, services_module_1.ServicesModule],
        exports: [database_module_1.DatabaseModule]
    })
], ControllersModule);
//# sourceMappingURL=controllers.module.js.map