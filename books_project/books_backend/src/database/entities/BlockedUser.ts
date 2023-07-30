import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    OneToOne, ManyToOne,
} from 'typeorm';
import { User } from './User';
import { JoinColumn } from 'typeorm';

@Entity()
export class BlockedUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.blockedUsers)
    user: Relation<User>;

    @Column({ type: 'datetime' })
    blockedAt?: Date;

    @Column({ type: 'datetime', nullable: true })
    unblockedAt?: Date;


    constructor(user?: User, blockedAt?: Date, unblockedAt?: Date) {
        this.user = user;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
    }
}
