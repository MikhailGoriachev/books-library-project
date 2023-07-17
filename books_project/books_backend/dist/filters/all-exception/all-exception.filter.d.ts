import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    catch(exception: Error | HttpException, host: ArgumentsHost): void;
}
