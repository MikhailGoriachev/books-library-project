import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class UserPassword extends BaseEntity {
    id: number;
    user: User;
    password: string;
    isServiceAuth: boolean;
    constructor(user?: User, password?: string, isServiceAuth?: boolean);
}
