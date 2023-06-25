import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    Relation,
    OneToMany,
} from 'typeorm';
import { Book } from './Book';
import { AuthorView } from './AuthorView';

@Entity()
export class Author {
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

    constructor(name?: string, description?: string, detailsLink?: string, image?: string) {
        this.name = name;
        this.description = description;
        this.detailsLink = detailsLink;
        this.image = image;
    }
}
