import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Relation,
    OneToMany, OneToOne,
} from 'typeorm';
import { Book } from './Book';
import { AuthorView } from './AuthorView';
import { AuthorViewStatistic } from './AuthorViewStatistic';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column({ length: 2000 })
    description: string;

    @Column({ length: 512 })
    detailsLink: string;

    @Column({ length: 255 })
    image: string;

    @ManyToMany(type => Book, book => book.authors)
    @JoinTable()
    books: Relation<Book[]>;

    @OneToMany(type => AuthorView, authorView => authorView.author)
    authorViews: Relation<AuthorView[]>;

    @OneToOne(type => AuthorViewStatistic, authorViewStatistic => authorViewStatistic.author)
    authorViewStatistic: Relation<AuthorViewStatistic>;

    constructor(name?: string, description?: string, detailsLink?: string, image?: string) {
        super();
        this.name = name;
        this.description = description;
        this.detailsLink = detailsLink;
        this.image = image;
    }
}
