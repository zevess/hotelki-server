import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { Resend } from 'resend';
import { ResetPasswordTemplate } from './templates/reset-password.template';


@Injectable()
export class MailService {
    public constructor(private readonly configService: ConfigService) { }

    public async sendConfirmationEmail(email: string, token: string) {
        const domain = this.configService.getOrThrow<string>("CLIENT_URL")
        const html = await render(ConfirmationTemplate({ domain, token }))

        return this.sendMail(email, "Подтверждение почты", html)
    }

    public async sendPasswordResetEmail(email: string, token: string) {
        const domain = this.configService.getOrThrow<string>("CLIENT_URL")
        const html = await render(ResetPasswordTemplate({ domain, token }))

        return this.sendMail(email, "Сброс пароля", html)
    }

    private async sendMail(email: string, subject: string, html: string) {

        const resend = new Resend(process.env.MAIL_PASSWORD)

        await resend.emails.send({
            from: 'Hotelki App <onboarding@resend.dev>',
            to: [email],
            subject: subject,
            html: html,
        })

    }
}
