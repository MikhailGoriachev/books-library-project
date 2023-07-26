import { Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { AuthService } from '../auth.service';
import { ExpiredTokensService } from '../../database/services/expired-tokens/expired-tokens.service';
declare const JwtAccessStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private _authService;
    private _apiConfigService;
    private _expiredTokensService;
    constructor(_authService: AuthService, _apiConfigService: ApiConfigService, _expiredTokensService: ExpiredTokensService);
    validate(payload: any): Promise<any>;
}
export {};
