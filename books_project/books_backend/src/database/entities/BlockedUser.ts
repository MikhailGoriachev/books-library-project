import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Relation,
    OneToOne, ManyToOne,
} from 'typeorm';
import { User } from './User';
import { JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BlockedUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.blockedUsers)
    user: Relation<User>;

    @Column({ type: 'datetime' })
    blockedAt?: Date;

    @Column({ type: 'datetime', nullable: true })
    unblockedAt?: Date;


    constructor(user?: User, blockedAt?: Date, unblockedAt?: Date) {
        super();
        this.user = user;
        this.blockedAt = blockedAt;
        this.unblockedAt = unblockedAt;
    }
}
