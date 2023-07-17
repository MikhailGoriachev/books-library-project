import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExpiredToken {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 512 })
    token: string;

    @Column({ type: 'datetime' })
    expiredAt: Date;

    constructor(token?: string, expiredAt?: Date) {
        this.token = token;
        this.expiredAt = expiredAt;
    }
}
