import { ExecutionContext } from '@nestjs/common';
import { ExpiredTokensService } from '../../database/services/expired-tokens/expired-tokens.service';
declare const JwtRefreshAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtRefreshAuthGuard extends JwtRefreshAuthGuard_base {
    private _expiredTokensService;
    constructor(_expiredTokensService: ExpiredTokensService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
export {};
