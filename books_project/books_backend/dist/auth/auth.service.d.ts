import { UsersService } from '../database/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { RegistrationDto } from '../dto/auth/registration.dto';
import { UserPasswordsService } from '../database/services/user-passwords/user-passwords.service';
import { RolesService } from '../database/services/roles/roles.service';
import { ExpiredTokensService } from '../database/services/expired-tokens/expired-tokens.service';
export declare class AuthService {
    private _usersService;
    private _jwtService;
    private _apiConfigService;
    private _userPasswordsService;
    private _roles;
    private _expiredTokensService;
    constructor(_usersService: UsersService, _jwtService: JwtService, _apiConfigService: ApiConfigService, _userPasswordsService: UserPasswordsService, _roles: RolesService, _expiredTokensService: ExpiredTokensService);
    generateJwtRefreshToken(email: string, password: string): Promise<any>;
    generateJwtAccessToken(email: string): Promise<any>;
    validateUser(email: string): Promise<any>;
    login(email: string, password: string): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
    logout(accessToken: string, refreshToken: string): Promise<any>;
    registration(registration: RegistrationDto): Promise<{
        message: string;
    }>;
}
