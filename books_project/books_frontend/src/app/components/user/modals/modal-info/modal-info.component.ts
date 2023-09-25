import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-modal-info',
    templateUrl: './modal-info.component.html',
    styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, body: string }) {}
}
