import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionFilter } from './filters/all-exception/all-exception.filter';


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    
    app.useGlobalFilters(new AllExceptionFilter());
    
    app.enableCors();
    
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT'));
}

bootstrap();
