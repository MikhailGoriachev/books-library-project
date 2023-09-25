import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatButtonToggleChange } from "@angular/material/button-toggle";
import { RegistrationDto } from "../../../dto/auth/registration.dto";
import { AuthDto } from "../../../dto/auth/auth.dto";
import { AuthService } from "../../../services/auth/auth.service";
import { DataManagerService } from "../../../services/data-manager/data-manager.service";
import { EventsService } from "../../../services/events/events.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    public isRegistration = false;

    public error = '';

    public authForm = this._fb.group({
        name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
        email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255), Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
        isCart: [false, []]
    });

    public get isValid(): boolean {
        return this.authForm.valid;
    }

    public hidePassword = true;

    constructor(
        public dialogRef: MatDialogRef<AuthComponent>,
        private readonly _fb: FormBuilder,
        private readonly _authService: AuthService,
        private readonly _dataManagerService: DataManagerService,
        private readonly _eventsService: EventsService
    ) {}

    ngOnInit() {
        this.authForm.patchValue({name: 'no name'});
    }

    onClose(): void {
        this.dialogRef.close();
    }

    onToggleChangeMode($event: MatButtonToggleChange) {
        const registrationValue = 'registration';
        this.isRegistration = $event.value === registrationValue;
        this.authForm.patchValue({name: this.isRegistration ? '' : 'no name'});
        this.error = '';
    }

    async onSubmit(): Promise<void> {
        const data = this.authForm.value;

        const dataCart = [...this._dataManagerService.cartItems];

        // const sub = this._eventsService.changeLogin.subscribe(
        //     async ({isAuth}) => {
        //         if (isAuth) {
        //             if (data.isCart) {
        //                 // await this._dataManagerService.clearCart();
        //                 await this._dataManagerService.loadCartItems();
        //                 await this._dataManagerService.loadSales();
        //
        //                 console.log('Перед заполнением: ' + this._dataManagerService.cartItems.length);
        //                 console.log('Перед заполнением (тек): ' + dataCart.length);
        //                 dataCart.filter(c =>
        //                         !this._dataManagerService.cartItems.find(cur => cur.id === c.id)
        //                     // && !this._dataManagerService.sales.find(cur => cur.book.id === c.id)
        //                 )
        //                         .forEach(c => this._dataManagerService.addToCart(c));
        //             }
        //         }
        //     }
        // )

        try {
            if (this.isRegistration)
                await this._authService.registration(
                    new RegistrationDto(data.name, data.email, data.password)
                );
            else
                await this._authService.login(new AuthDto(data.email, data.password));

            if (data.isCart) {
                // await this._dataManagerService.clearCart();
                // await this._dataManagerService.loadCartItems();
                // await this._dataManagerService.loadSales();

                console.log('Перед заполнением: ' + this._dataManagerService.cartItems.length);
                console.log('Перед заполнением (тек): ' + dataCart.length);
                dataCart.forEach(c => this._dataManagerService.addToCart(c));
            }

            console.log(this.isRegistration ? 'Регистрация' : 'Вход')

            this.dialogRef.close(true);
        } catch (error) {
            this.error = error.error.message;

            console.log(error.error.message);

            const message = error.error.message;
            switch (message) {
                case 'Unauthorized':
                    this.error = 'Неправильная почта или пароль';
                    break;
                case 'Duplicate email':
                    this.error = 'Такая почта уже существует';
                    break;
            }

            console.dir(error);
        }
    }
}
