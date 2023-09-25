import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { User } from './User';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @ManyToMany(type => User, user => user.roles, { cascade: true })
    @JoinTable()
    users: Relation<User[]>;
    
    
    constructor(name?: string) {
        super();
        this.name = name;
    }
}
