import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this._reflector.get<string[]>('roles', context.getHandler());
        if (!roles)
            return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        if (!user)
            return false;
        
        return roles.find(role => user.roles.find(r => r.name === role)) !== undefined;
    }
}
