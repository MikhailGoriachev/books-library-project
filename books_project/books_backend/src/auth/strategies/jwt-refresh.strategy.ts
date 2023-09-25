import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../database/services/users/users.service';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private authService: AuthService,
                private apiConfigService: ApiConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: apiConfigService.jwtRefreshSecret,
        });
    }

    async validate(payload: any): Promise<any> {
        const result = await this.authService.validateUser(payload.email);

        if (!result)
            throw new HttpException('Invalid refresh token', 498);

        return result;
    }

    // Добавляем обработку ошибок аутентификации
    async authenticate(req: any, options?: any) {
        return super.authenticate(req, options);
    }
}