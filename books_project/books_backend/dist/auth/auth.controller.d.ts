import { AuthService } from './auth.service';
import { AuthDto } from '../dto/auth/auth.dto';
import { RegistrationDto } from '../dto/auth/registration.dto';
import { TokenDto } from '../dto/auth/token.dto';
export declare class AuthController {
    private _authService;
    constructor(_authService: AuthService);
    registration(registration: RegistrationDto): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
    login(signInDto: AuthDto): Promise<{
        access_token: any;
        refresh_token: any;
    }>;
    logout(token: TokenDto): Promise<any>;
    getAccessToken(req: any): Promise<any>;
    getProfile(req: any): any;
    resetPassword(email: string): Promise<void>;
}
