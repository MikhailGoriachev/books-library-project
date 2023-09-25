import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class ExpiredToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 512 })
    token: string;

    @Column({ type: 'datetime' })
    expiredAt: Date;

    constructor(token?: string, expiredAt?: Date) {
        super();
        this.token = token;
        this.expiredAt = expiredAt;
    }
}
