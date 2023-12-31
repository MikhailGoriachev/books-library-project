import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpiredTokensService } from '../../database/services/expired-tokens/expired-tokens.service';
import { Request } from 'express';

@Injectable()
// export class AuthGuard implements CanActivate {
export class JwtAccessAuthGuard extends AuthGuard('jwt-access') {
    constructor(private _expiredTokensService: ExpiredTokensService) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const res = await super.canActivate(context);

        if (!res)
            return new Promise(() => res);

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token || (await this._expiredTokensService.findOne(token)))
            throw new UnauthorizedException();

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
