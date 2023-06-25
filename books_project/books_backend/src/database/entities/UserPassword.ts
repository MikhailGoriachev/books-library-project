import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class UserPassword {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, user => user.userPassword)
    @JoinColumn()
    user: User;

    @Column({ length: 255, nullable: true })
    password: string;

    // признак аутентификации с помощью внешних сервисов
    @Column()
    isServiceAuth: boolean;


    constructor(user?: User, password?: string, isServiceAuth?: boolean) {
        this.user = user;
        this.password = password;
        this.isServiceAuth = isServiceAuth;
    }
}
