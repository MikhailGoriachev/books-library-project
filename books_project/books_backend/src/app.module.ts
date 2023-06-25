import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './controllers/users/users.controller';
import { BooksController } from './controllers/books/books.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [AppController, UsersController, BooksController],
    providers: [AppService],
})
export class AppModule {}
