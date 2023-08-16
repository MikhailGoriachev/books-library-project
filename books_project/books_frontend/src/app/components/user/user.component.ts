import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent {
    constructor(private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {

        this.matIconRegistry.addSvgIcon(
            'github',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/github.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'gmail',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/gmail.svg')
        );
    }
}
