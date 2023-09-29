import { MailService } from './mail/mail.service';
export declare class AppController {
    private readonly _mailService;
    constructor(_mailService: MailService);
    sendMessage(user: {
        email: string;
        name: string;
    }): Promise<void>;
}
