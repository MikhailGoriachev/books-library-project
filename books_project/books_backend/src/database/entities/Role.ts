import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { User } from './User';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @ManyToMany(type => User, user => user.roles, { cascade: true })
    @JoinTable()
    users: Relation<User[]>;


    constructor(name?: string) {
        this.name = name;
    }
}
