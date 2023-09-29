export class UserCreateDto {
    constructor(
        public name?: string,
        public email?: string,
        public image?: string,
        public isAdmin?: boolean
    ) {}
}
