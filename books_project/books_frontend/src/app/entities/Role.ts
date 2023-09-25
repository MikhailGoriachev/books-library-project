import { User } from './User';
import { BaseEntity } from "./BaseEntity";


export class Role extends BaseEntity {
    id: number;

    name: string;

    users?: User[];


    constructor(id?: number, name?: string) {
        super();
        this.id = id;
        this.name = name;
    }


    static assign(a: Role, b: Partial<Role>) {
        a.id = b.id
        a.name = b.name;
        a.createdAt = b.createdAt;
        a.updatedAt = b.updatedAt;
        a.deletedAt = b.deletedAt;

        a.users = b.users !== undefined
            ? b.users.map(u => User.assign(new User(), u))
            : undefined;

        return a;
    }
}
