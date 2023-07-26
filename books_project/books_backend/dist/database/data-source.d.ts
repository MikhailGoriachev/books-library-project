import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
export declare const entities: EntityClassOrSchema[];
export declare const appDataSourceOptions: DataSourceOptions & SeederOptions;
export declare const AppDataSource: DataSource;
