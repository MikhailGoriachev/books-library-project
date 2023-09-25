import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class UserPassword extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.userPassword)
    @JoinColumn()
    user: User;

    @Column({ length: 255, nullable: true })
    password: string;

    // признак аутентификации с помощью внешних сервисов
    @Column({ default: false })
    isServiceAuth: boolean;


    constructor(user?: User, password?: string, isServiceAuth?: boolean) {
        super();
        this.user = user;
        this.password = password;
        this.isServiceAuth = isServiceAuth;
    }
}
