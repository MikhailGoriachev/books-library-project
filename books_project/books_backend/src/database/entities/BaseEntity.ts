import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
    @CreateDateColumn()
    @Exclude()
    public createdAt: Date;
    
    @UpdateDateColumn()
    @Exclude()
    public updatedAt: Date;    
    
    @DeleteDateColumn()
    @Exclude()
    public deletedAt: Date;
}