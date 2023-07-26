import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../database/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { RegistrationDto } from '../dto/auth/registration.dto';
import { UserPasswordsService } from '../database/services/user-passwords/user-passwords.service';
import { User } from '../database/entities/User';
import { UserPassword } from '../database/entities/UserPassword';
import { RolesService } from '../database/services/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { ExpiredTokensService } from '../database/services/expired-tokens/expired-tokens.service';
import { ExpiredToken } from '../database/entities/ExpiredToken';

@Injectable()
export class AuthService {
    constructor(private _usersService: UsersService,
                private _jwtService: JwtService,
                private _apiConfigService: ApiConfigService,
                private _userPasswordsService: UserPasswordsService,
                private _roles: RolesService,
                private _expiredTokensService: ExpiredTokensService) {}

    async generateJwtRefreshToken(email: string, password: string): Promise<any> {
        const user = await this._usersService.getUserWithPassword({ email });

        // if (!user || user.userPassword.password !== password || user.isBlocked)
        if (!user || !(await bcrypt.compare(password, user.userPassword.password)) || user.isBlocked)
            throw new UnauthorizedException();

        const payload = { sub: user.id, email: user.email };

        return {
            refresh_token: await this._jwtService.signAsync(payload, {
                secret: this._apiConfigService.jwtRefreshSecret,
                expiresIn: this._apiConfigService.jwtRefreshExpiry,
            }),
        };
    }

    async generateJwtAccessToken(email: string): Promise<any> {
        const user = await this._usersService.findOne({ email });

        if (!user || user.isBlocked)
            throw new UnauthorizedException();

        const payload = { sub: user.id, email: user.email };

        return {
            access_token: await this._jwtService.signAsync(payload, {
                secret: this._apiConfigService.jwtAccessSecret,
                expiresIn: this._apiConfigService.jwtAccessExpiry,
            }),
        };
    }

    async validateUser(email: string): Promise<any> {
        const user = await this._usersService.getUserWithPassword({ email });

        if (user && !user.blockedUsers.find(b => !b.unblockedAt) || !user.isBlocked) {
            const { userPassword, ...result } = user;
            return result;
        }

        return null;
    }

    async login(email: string, password: string) {
        const user = await this._usersService.getUserWithPassword({ email });

        if (!user || user.userPassword.isServiceAuth ||
            !(await bcrypt.compare(password, user.userPassword.password)) || user.isBlocked)
            throw new UnauthorizedException();

        return {
            access_token: (await this.generateJwtAccessToken(user.email))['access_token'],
            refresh_token: (await this.generateJwtRefreshToken(email, password))
                ['refresh_token'],
        };
    }

    async logout(accessToken: string, refreshToken: string) {
        try {
            const access = await this._jwtService.verifyAsync(accessToken,
                { secret: this._apiConfigService.jwtAccessSecret });

            const refresh = await this._jwtService.verifyAsync(refreshToken,
                { secret: this._apiConfigService.jwtRefreshSecret });

            const accessExpiredToken = new ExpiredToken(accessToken, new Date(access.exp * 1000));
            const refreshExpiredToken = new ExpiredToken(refreshToken, new Date(refresh.exp * 1000));

            await this._expiredTokensService.save(accessExpiredToken);
            await this._expiredTokensService.save(refreshExpiredToken);
        } catch (e) {
            return e;
        }
    }   

    async registration(registration: RegistrationDto) {
        try {
            const user = new User(registration.name, registration.email);
            user.roles = [await this._roles.findOne({ name: 'user' })];

            await this._usersService.save(user);

            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(registration.password, saltRounds);

            const userPassword = new UserPassword(user, hashPassword, false);
            await this._userPasswordsService.save(userPassword);
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY')
                return { message: 'Duplicate email' };
        }
    }
}
