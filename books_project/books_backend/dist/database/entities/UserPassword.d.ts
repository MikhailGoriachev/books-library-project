import { User } from './User';
export declare class UserPassword {
    id: number;
    user: User;
    password: string;
    isServiceAuth: boolean;
    constructor(user?: User, password?: string, isServiceAuth?: boolean);
}
