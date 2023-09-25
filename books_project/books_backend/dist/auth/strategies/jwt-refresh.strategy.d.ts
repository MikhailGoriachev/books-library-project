import { Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../services/api-config/api-config.service';
import { AuthService } from '../auth.service';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private authService;
    private apiConfigService;
    constructor(authService: AuthService, apiConfigService: ApiConfigService);
    validate(payload: any): Promise<any>;
    authenticate(req: any, options?: any): Promise<void>;
}
export {};
