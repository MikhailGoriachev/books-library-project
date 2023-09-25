import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { DataManagerService } from "../../services/data-manager/data-manager.service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    constructor(
        private readonly _matIconRegistry: MatIconRegistry,
        private readonly _domSanitizer: DomSanitizer,
        private readonly _dataManagerService: DataManagerService,
    ) {

        this._matIconRegistry.addSvgIcon(
            'github',
            this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/github.svg')
        );

        this._matIconRegistry.addSvgIcon(
            'gmail',
            this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gmail.svg')
        );

        // this._dataManagerService.loadCartItems().then(() => console.log(this._dataManagerService.cartItems));
        // this._dataManagerService.loadUserProfile().then();
    }
}
