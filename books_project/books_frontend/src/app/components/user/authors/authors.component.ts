import { Component } from '@angular/core';
import { Author } from "../../../entities/Author";
import { PageDto } from "../../../dto/pagination/page.dto";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthorsApiService } from "../../../services/api/crud/authors-api/authors-api.service";
import { Router } from "@angular/router";
import { OrderEnum } from "../../../infrastructure/OrderEnum";
import { AuthorPaginationFilterDto } from "../../../dto/filters/author-pagination-filter.dto";
import { BACKEND_API } from "../../../infrastructure/constants";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
    public authorsPage: PageDto<Author>;
    public currentFilter: AuthorPaginationFilterDto = new AuthorPaginationFilterDto();

    baseUrl = BACKEND_API;

    public filterForm = this._fb.group({
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
        private readonly _fb: FormBuilder,
        private readonly _router: Router,
        private readonly _dataManagerService: DataManagerService
    ) {}


    ngOnInit() {
        this._authorsApiService.findAllPagination()
            .subscribe(b => this.authorsPage = b);
    }

    changePage(event) {
        Object.assign(this.currentFilter, {order: OrderEnum.ASC, page: event.pageIndex + 1, take: event.pageSize})
        this._authorsApiService.findAllPagination(this.currentFilter)
            .subscribe(b => {
                this.authorsPage = b
                window.scroll({top: 0})
            });
    }

    public onFilterSubmit() {
        Object.assign(this.currentFilter, this.filterForm.value);
        this.currentFilter.page = 1;
        this._authorsApiService.findAllPagination(
            this.currentFilter
        ).subscribe(b => this.authorsPage = b);
    }

    public onFilterClear() {
        this.filterForm.patchValue({
            name: '',
        });
        this.onFilterSubmit();
    }

    async toCardDetails(id: number) {
        await this._router.navigate([`/authors/${id}`]);
    }
}
