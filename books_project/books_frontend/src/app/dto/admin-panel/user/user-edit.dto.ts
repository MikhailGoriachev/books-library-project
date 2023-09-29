export class UserEditDto {
    constructor(
        public id?: number,
        public name?: string,
        public email?: string,
        public image?: string,
        public isAdmin?: boolean
    ) {}
}
