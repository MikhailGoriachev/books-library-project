import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UserPasswordsService } from '../../../database/services/user-passwords/user-passwords.service';
import { UserPasswordFilterDto } from '../../../dto/filters/user-password-filter.dto';
import { UserPasswordDto } from '../../../dto/crud/user-password.dto';
import { UserPassword } from '../../../database/entities/UserPassword';

@Controller('user-passwords')
export class UserPasswordsController {
    constructor(private _userPasswordsService: UserPasswordsService) {}

    // @Get()
    // findAll(@Query(new ValidationPipe({ transform: true })) filter: UserPasswordFilterDto) {
    //     return this._userPasswordsService.findAll(filter);
    // }
    //
    // @Get('first')
    // findOne(@Query(new ValidationPipe({ transform: true })) filter: UserPasswordFilterDto) {
    //     return this._userPasswordsService.findOne(filter);
    // }
    //
    // @Get(':id')
    // findOneById(@Param('id', ParseIntPipe) id: number) {
    //     return this._userPasswordsService.findOne({ id });
    // }
    //
    // @Post()
    // create(@Body() item: UserPasswordDto) {
    //     item.id = null;
    //     return this._userPasswordsService.save(Object.assign(new UserPassword(), item));
    // }
    //
    // @Put()
    // update(@Body() item: UserPasswordDto) {
    //     return this._userPasswordsService.save(Object.assign(new UserPassword(), item));
    // }
}
