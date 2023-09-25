import { Entity, PrimaryGeneratedColumn, Column, Relation, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Book } from './Book';
import { JoinTable } from 'typeorm';
import { CategoryView } from './CategoryView';
import { CategoryViewStatistic } from './CategoryViewStatistic';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @ManyToMany(type => Book, books => books.categories)
    @JoinTable()
    books: Relation<Book[]>;

    @OneToMany(type => CategoryView, categoryView => categoryView.category)
    categoryViews: Relation<CategoryView[]>;

    @OneToOne(type => CategoryViewStatistic, categoryViewStatistic => categoryViewStatistic.category)
    categoryViewStatistic: Relation<CategoryViewStatistic>;


    constructor(name?: string) {
        super();
        this.name = name;
    }
}
