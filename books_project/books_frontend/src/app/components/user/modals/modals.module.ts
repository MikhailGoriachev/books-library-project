import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from "./modal/modal.component";
import { RouterOutlet } from "@angular/router";
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
    declarations: [
        ModalComponent,
        ModalInfoComponent,
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class ModalsModule {
}
