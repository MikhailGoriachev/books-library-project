import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private _reflector;
    constructor(_reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
