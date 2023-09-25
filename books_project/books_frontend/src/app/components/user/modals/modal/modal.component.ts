import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BookDetailsComponent } from "../../books/book-details/book-details.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/overlay";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    constructor(
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,
        private readonly _matDialog: MatDialog
    ) {}

    ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            this._activatedRoute.data.subscribe(data => {
                const backPath = data['backPath'] ?? (data['backPathFunc'] ? data['backPathFunc'](this._router.url) : undefined);
                this.openDialog(data['component'], params, data['config'], backPath, data['data']).then();
            })
        });
    }

    async openDialog(component: ComponentType<any>, params: Params, config: MatDialogConfig, backPath?: string, data?: any) {
        console.log(backPath);
        const dialog = this._matDialog.open(
            component,
            // {...config, data: {params, data: {...config?.data}}}
            {...config, data: {...params, ...data}}
        );

        if (backPath)
            dialog.afterClosed()
                  .subscribe(async () => await this._router.navigate([backPath]));
    }
}
