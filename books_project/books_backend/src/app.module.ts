import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ControllersModule } from './controllers/controllers.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
// import { ApiConfigService } from './services/api-config/api-config.service';
import { RolesGuard } from './guards/roles/roles.guard';
import { ServicesModule } from './services/services.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
            serveRoot: '/public/',
            serveStaticOptions: {
                index: false,
            },
        }),
        DatabaseModule,
        AuthModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServicesModule,
        ControllersModule,
        MailModule,
    ],
    controllers: [AppController],
    providers: [AppService, RolesGuard],
})
export class AppModule {}
