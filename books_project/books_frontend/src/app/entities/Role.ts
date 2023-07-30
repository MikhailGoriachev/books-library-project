import { User } from './User';


export class Role {
    id: number;

    name: string;

    users?: User[];


    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }


    static assign(a: Role, b: Partial<Role>) {
        a.id = b.id
        a.name = b.name;

        a.users = b.users !== undefined
            ? b.users.map(u => User.assign(new User(), u))
            : undefined;

        return a;
    }
}
