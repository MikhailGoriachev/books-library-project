import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Relation, OneToMany, ManyToOne } from 'typeorm';
import { Book } from './Book';
import { FileExtension } from './FileExtension';
import { BaseEntity } from './BaseEntity';

@Entity()
export class BookFile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    path: string;

    @ManyToOne(type => FileExtension, fileExtension => fileExtension.bookFiles, { cascade: true })
    fileExtension: Relation<FileExtension>;

    @ManyToOne(type => Book, book => book.bookFiles, { cascade: true })
    book: Relation<Book>;


    constructor(path?: string, fileExtension?: FileExtension, book?: Book) {
        super();
        this.path = path;
        this.fileExtension = fileExtension;
        this.book = book;
    }
}
