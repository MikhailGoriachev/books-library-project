import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

// @Catch(HttpException)
@Catch(Error)
export class AllExceptionFilter implements ExceptionFilter {
    // catch(exception: HttpException, host: ArgumentsHost) {
    catch(exception: Error | HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        
        // const status = exception.getStatus();
        let status = 500;
        
        if (exception instanceof HttpException)
           status = exception.getStatus(); 
        
        const message = exception.message || 'Internal server error';

        response
            .status(status)
            .json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
    }
}
