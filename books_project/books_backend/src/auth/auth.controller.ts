import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth/auth.dto';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { RegistrationDto } from '../dto/auth/registration.dto';
import { Roles } from '../decorators/roles/roles.decorator';
import { RolesGuard } from '../guards/roles/roles.guard';
import { RolesEnum } from '../infrastructure/RolesEnum';
import { TokenDto } from '../dto/auth/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private _authService: AuthService) {}

    @Post('registration')
    async registration(@Body() registration: RegistrationDto) {
        const error = await this._authService.registration(registration);

        if (error) {
            throw new HttpException(error.message, 401);
        }

        return this._authService.login(registration.email, registration.password);
    }


    // {
    //     "name": "Mikhail Goriachev",
    //     "email": "mishagor228@gmail.com",
    //     "password": "!bAne2qdEwfhV50H0qvWEJCnWGRCMu6i6zhJBqiJgvfZ2VYk8"
    // }
    @Post('login')
    async login(@Body() signInDto: AuthDto) {
        return this._authService.login(signInDto.email, signInDto.password);
    }


    /*
    expired tokens:
    {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5MjAzMjcyfQ.KfPP0YZIf2IUJ52qYe5uuvi4TrQtbTYVoa6W-9FYLos",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjc0LCJlbWFpbCI6Im1pc2hhZ29yMjI4QGdtYWlsLmNvbSIsImlhdCI6MTY4OTIwMjM3MiwiZXhwIjoxNjg5ODA3MTcyfQ.oWqBMZM6AXLsgHXV3EMdd6-YwLqNtUZVH5tHFBvN0u0"
    }
     */
    @UseGuards(JwtAccessAuthGuard)
    @Post('logout')
    async logout(@Body() token: TokenDto) {
        const error = await this._authService.logout(token.accessToken, token.refreshToken);
        if (error) {
            const { name, ...result } = error;
            return result;
        }
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Get('token')
    async getAccessToken(@Request() req) {
        console.log(`GET ACCESS TOKEN ${new Date()}`);
        return this._authService.generateJwtAccessToken(req.user.email);
    }

    @UseGuards(RolesGuard)
    @Roles(RolesEnum.user, RolesEnum.admin)
    @UseGuards(JwtAccessAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    // сбросить пароль
    @Post('reset-password')
    async resetPassword(@Body('email') email: string) {
        return this._authService.resetPassword(email);
    }
}
