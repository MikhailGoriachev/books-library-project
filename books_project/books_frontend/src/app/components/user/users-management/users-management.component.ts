import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../entities/User";
import { BACKEND_API } from "../../../infrastructure/constants";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsService } from "../../../services/events/events.service";
import { UsersApiService } from "../../../services/api/crud/users-api/users-api.service";
import { PageDto } from "../../../dto/pagination/page.dto";
import { UserPaginationFilterDto } from "../../../dto/filters/user-pagination-filter.dto";
import { OrderEnum } from "../../../infrastructure/OrderEnum";
import { UserFormComponent } from "./user-form/user-form.component";

@Component({
    selector: 'app-users-management',
    templateUrl: './users-management.component.html',
    styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit, OnDestroy {
    dataSource?: MatTableDataSource<User> = new MatTableDataSource<User>();

    public usersPage: PageDto<User>;
    public currentFilter: UserPaginationFilterDto = new UserPaginationFilterDto();

    headers: string[] = [
        'image',
        'id',
        'name',
        'email',
        'userCartItems',
        'sales',
        'isAdmin',
        'isBlocked'
    ];

    baseUrl = BACKEND_API;

    private changeUserSubscription: Subscription;

    private changeUserCollectionSubscription: Subscription;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        name: ['', [Validators.maxLength(255)]],
        email: ['', [Validators.maxLength(255)]],
    });

    public get isValid(): boolean {
        return this.filterForm.valid;
    }

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }


    constructor(
        private readonly _usersApiService: UsersApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _fb: FormBuilder,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}


    ngOnInit() {
        this._usersApiService
            .findAllPagination()
            .subscribe(d => {
                this.usersPage = d;
                this.dataSource.data = this.usersPage.data
                console.log(this.dataSource.data.map(u => u.isAdmin));
            });

        this.changeUserSubscription = this._eventsService.changeUser.subscribe(({id}) => {
            const index = this.usersPage.data.findIndex(a => a.id === id);
            if (index !== -1)
                this._usersApiService.findOneById(id)
                    .subscribe(a => {
                        this.usersPage.data[index] = a;
                        this.dataSource._updateChangeSubscription();
                        console.dir(this.usersPage.data[index]);
                    });
        });

        this.changeUserCollectionSubscription = this._eventsService.changeUserCollection.subscribe(() => {
            this._usersApiService.findAllPagination(this.currentFilter)
                .subscribe(b => {
                    this.usersPage = b
                    this.dataSource.data = this.usersPage.data;
                    this.dataSource._updateChangeSubscription();
                });
        });
    }

    changePage(event) {
        Object.assign(this.currentFilter, {order: OrderEnum.ASC, page: event.pageIndex + 1, take: event.pageSize})
        this._usersApiService.findAllPagination(this.currentFilter)
            .subscribe(b => {
                this.usersPage = b
                this.dataSource.data = this.usersPage.data;
                this.dataSource._updateChangeSubscription();
            });
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);
        this.currentFilter.page = 1;
        this._usersApiService.findAllPagination(
            this.currentFilter
        ).subscribe(b => {
            this.usersPage = b;
            this.dataSource.data = this.usersPage.data;
        });
    }


    public onFilterClear() {
        this.filterForm.patchValue({
            id: '',
            name: '',
            email: ''
        });
        this.onFilterSubmit();
    }

    editUser(id: number) {
        const dialogRef = this._matDialog.open(UserFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
            data: {id}
        });
    }

    createUser() {
        const dialogRef = this._matDialog.open(UserFormComponent, {
            // maxWidth: '100vw',
            // maxHeight: '100vh',
            // height: '98%',
            // width: '98%',
            // panelClass: ['full-screen-modal', 'full-height-content'],
        });
    }

    ngOnDestroy() {
        this.changeUserSubscription?.unsubscribe();
        this.changeUserCollectionSubscription?.unsubscribe();
    }
}
