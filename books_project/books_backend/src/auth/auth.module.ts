import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiConfigService } from '../services/api-config/api-config.service';
import { JwtAccessAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { ExpiredTokensService } from '../database/services/expired-tokens/expired-tokens.service';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.registerAsync({
            global: true,
            useFactory: () => ({}),
        }),
        MailModule
    ],
    providers: [
        AuthService,
        JwtAccessStrategy,
        JwtRefreshStrategy,
        ApiConfigService,
        JwtAccessAuthGuard,
        JwtRefreshAuthGuard
    ],
    exports: [
        AuthService
    ],
    controllers: [AuthController],
})
export class AuthModule {}
