import { Relation } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    users: Relation<User[]>;
    constructor(name?: string);
}
