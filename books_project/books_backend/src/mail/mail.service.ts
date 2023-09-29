import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserMail } from '../models/UserMail';

@Injectable()
export class MailService {
    constructor(private readonly _mailerService: MailerService) {}
    
    async sendUserConfirmation(user: {email: string, name: string}, token: string) {
        const url = `http://localhost:4200/books?token=${token}`;
        
        try {

            await this._mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Nise App! Confirm your Email',
                template: './confirmation',
                context: {
                    name: user.name,
                    url
                }
            });
        } catch (err) {
            console.dir(err);
        }   
        console.log('SEND');
    }
    
    async sendResetPasswordMessage(user: UserMail, newPassword: string) {
        // TODO: для теста
        user.email = 'mishagor228@gmail.com';
        
        await this._mailerService.sendMail({
           to: user.email,
           subject: 'Book Market | Ваш новый пароль',
           template : './reset-password',
           context: {
               name: user.name,
               newPassword
           } 
        });
    }
    
    async sendRegistrationMessage(user: UserMail, login: string, password: string) {
        // TODO: для теста
        user.email = 'mishagor228@gmail.com';
        
        await this._mailerService.sendMail({
           to: user.email,
           subject: 'Book Market | Добро пожаловать в наш сервис!',
           template : './registration',
           context: {
               name: user.name,
               login: login,
               password
           } 
        });
    }
}
