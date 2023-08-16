import { Injectable } from '@angular/core';
import { User } from "../../entities/User";
import { UserCartItem } from "../../entities/UserCartItem";

@Injectable({
    providedIn: 'root'
})
export class ProfileDataService {
    constructor() { }

    public user?: User;

    public cartItems?: UserCartItem[];
}
