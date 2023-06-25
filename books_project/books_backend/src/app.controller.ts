import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './database/entities/User';
import { UsersService } from './database/services/users/users.service';

@Controller()
export class AppController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getHello() {
        return await this.usersService.findAll();
        // return this.appService.getHello();
    }
}
