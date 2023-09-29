import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
    constructor(private readonly _mailService: MailService) {}
    
    
    @Post('send-message')
    async sendMessage(@Body() user: {email: string, name: string}) {
        const token = '1234567890';
        
        await this._mailService.sendUserConfirmation(user, token);
    }
}
