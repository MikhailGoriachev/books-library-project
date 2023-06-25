import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UsersService } from '../../database/services/users/users.service';
import { User } from '../../database/entities/User';
import { UserDto } from '../../dto/crud/user.dto';
import { UserFilterDto } from '../../dto/filters/user-filter.dto';

@Controller('users')
export class UsersController {
    constructor(private _usersService: UsersService) {}

    @Get()
    findAll(@Query() filter: UserFilterDto) {
        return this._usersService.findAll(filter);
    }

    @Get('first')
    findOne(@Query() filter: UserFilterDto) {
        return this._usersService.findOne(filter);
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this._usersService.findOne({ id });
    }

    @Post()
    create(@Body() user: UserDto) {
        user.id = null;
        return this._usersService.save(Object.assign(new User(), user));
    }

    @Put()
    update(@Body() user: UserDto) {
        return this._usersService.save(Object.assign(new User(), user));
    }
}
