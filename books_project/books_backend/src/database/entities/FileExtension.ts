import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Relation } from 'typeorm';
import { BookFile } from './BookFile';

@Entity()
export class FileExtension {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string;

    @OneToMany(type => BookFile, bookFile => bookFile.fileExtension)
    bookFiles: Relation<BookFile[]>;


    constructor(name?: string) {
        this.name = name;
    }
}
