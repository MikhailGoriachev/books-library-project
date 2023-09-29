import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Author } from "../../../entities/Author";
import { PageDto } from "../../../dto/pagination/page.dto";
import { AuthorPaginationFilterDto } from "../../../dto/filters/author-pagination-filter.dto";
import { BACKEND_API } from "../../../infrastructure/constants";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthorsApiService } from "../../../services/api/crud/authors-api/authors-api.service";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { MatDialog } from "@angular/material/dialog";
import { EventsService } from "../../../services/events/events.service";
import { OrderEnum } from "../../../infrastructure/OrderEnum";
import { AuthorFormComponent } from "./author-form/author-form.component";

@Component({
    selector: 'app-authors-management',
    templateUrl: './authors-management.component.html',
    styleUrls: ['./authors-management.component.css']
})
export class AuthorsManagementComponent implements OnInit, OnDestroy {
    dataSource?: MatTableDataSource<Author> = new MatTableDataSource<Author>();

    public authorsPage: PageDto<Author>;
    public currentFilter: AuthorPaginationFilterDto = new AuthorPaginationFilterDto();

    headers: string[] = [
        'image',
        'id',
        'name',
        'authorViewStatistic',
        'isDeleted'
    ];

    baseUrl = BACKEND_API;

    private changeAuthorSubscription: Subscription;

    private changeAuthorCollectionSubscription: Subscription;

    public filterForm = this._fb.group({
        id: ['', [Validators.min(1)]],
        name: ['', [Validators.maxLength(150)]],
    });

    public get isValid(): boolean {
        return this.filterForm.valid;
    }

    get imagesVersion() {
        return this._dataManagerService.imagesVersion;
    }


    constructor(
        private readonly _authorsApiService: AuthorsApiService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _fb: FormBuilder,
        private readonly _matDialog: MatDialog,
        private readonly _eventsService: EventsService
    ) {}


    ngOnInit() {
        this._authorsApiService
            .findAllPaginationWithDeleted()
            .subscribe(d => {
                this.authorsPage = d;
                this.dataSource.data = this.authorsPage.data;
            });


        this.changeAuthorSubscription = this._eventsService.changeAuthor.subscribe(({id}) => {
            const index = this.authorsPage.data.findIndex(a => a.id === id);
            if (index !== -1)
                this._authorsApiService.findOneByIdWithDeleted(id)
                    .subscribe(a => {
                        this.authorsPage.data[index] = a;
                        this.dataSource._updateChangeSubscription();
                        console.dir(this.authorsPage.data[index]);
                    });
        });

        this.changeAuthorCollectionSubscription = this._eventsService.changeAuthorCollection.subscribe(() => {
            this._authorsApiService.findAllPaginationWithDeleted(this.currentFilter)
                .subscribe(b => {
                    this.authorsPage = b
                    this.dataSource.data = this.authorsPage.data;
                    this.dataSource._updateChangeSubscription();
                });
        });
    }

    changePage(event) {
        Object.assign(this.currentFilter, {order: OrderEnum.ASC, page: event.pageIndex + 1, take: event.pageSize})
        this._authorsApiService.findAllPaginationWithDeleted(this.currentFilter)
            .subscribe(b => {
                this.authorsPage = b
                this.dataSource.data = this.authorsPage.data;
                this.dataSource._updateChangeSubscription();
            });
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);
        this.currentFilter.page = 1;
        this._authorsApiService.findAllPagination(
            this.currentFilter
        ).subscribe(b => {
            this.authorsPage = b;
            this.dataSource.data = this.authorsPage.data;
        });
    }

    public onFilterClear() {
        this.filterForm.patchValue({
            id: '',
            name: '',
        });
        this.onFilterSubmit();
    }

    editAuthor(id: number) {
        const dialogRef = this._matDialog.open(AuthorFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
            data: {id}
        });
    }

    createAuthor() {
        const dialogRef = this._matDialog.open(AuthorFormComponent, {
            maxWidth: '100vw',
            maxHeight: '100vh',
            height: '98%',
            width: '98%',
            panelClass: ['full-screen-modal', 'full-height-content'],
        });
    }

    ngOnDestroy() {
        this.changeAuthorSubscription?.unsubscribe();
        this.changeAuthorCollectionSubscription?.unsubscribe();
    }
}
