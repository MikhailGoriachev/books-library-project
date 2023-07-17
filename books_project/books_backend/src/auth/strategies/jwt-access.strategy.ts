import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../database/services/users/users.service';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { AuthService } from '../auth.service';
import { ExpiredTokensService } from '../../database/services/expired-tokens/expired-tokens.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(private _authService: AuthService,
                private _apiConfigService: ApiConfigService,
                private _expiredTokensService: ExpiredTokensService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: _apiConfigService.jwtAccessSecret,
        });
    }

    async validate(payload: any): Promise<any> {
        const result = await this._authService.validateUser(payload.email);
        
        if (!result)
            throw new UnauthorizedException();
        
        return result;
    }
}