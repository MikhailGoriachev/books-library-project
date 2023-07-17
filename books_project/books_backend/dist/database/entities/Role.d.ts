import { Relation } from 'typeorm';
import { User } from './User';
export declare class Role {
    id: number;
    name: string;
    users: Relation<User[]>;
    constructor(name?: string);
}
