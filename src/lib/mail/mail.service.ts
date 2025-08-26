import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';
import { ConfirmationTemplate } from './templates/confirmation.template';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import * as nodemailer from 'nodemailer'

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

        const user = this.configService.getOrThrow<string>("EMAIL")
        const password = this.configService.getOrThrow<string>("PASSWORD")

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', 
            port: 587,
            secure: false,
            auth: {
                user: user, 
                pass: password,
            },
        })

        await transporter.sendMail({
            from: 'Hotelki App',
            to: email,
            subject: subject,
            html: html
        })

    }
}
