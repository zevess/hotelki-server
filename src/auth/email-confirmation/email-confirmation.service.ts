import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TOKEN_TYPE } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid'
import { ConfirmationDto } from './dto/confirmation.dto';
import { MailService } from 'src/lib/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class EmailConfirmationService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly mailService: MailService,
        private readonly userService: UserService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }

    public async newVerification(res: Response, dto: ConfirmationDto) {
        const existingToken = await this.prismaService.token.findUnique({
            where: {
                token: dto.token,
                type: TOKEN_TYPE.VERIFICATION
            }
        })

        if (!existingToken) {
            throw new NotFoundException("Токен не действителен")
        }

        const hasExpired = new Date(existingToken.expiresIn) < new Date()

        if (hasExpired) {
            throw new BadRequestException("Токен истек")
        }

        const existingUser = await this.userService.getByEmail(existingToken.email)

        if (!existingUser) {
            throw new NotFoundException("Пользователь не найден")
        }

        await this.prismaService.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                isVerified: true
            }
        })

        await this.prismaService.token.delete({
            where: {
                id: existingToken.id,
                type: TOKEN_TYPE.VERIFICATION
            }
        })

        return this.authService.auth(res, existingUser.id)

    }

    public async sendVerificationToken(email: string) {

        const verificationToken = await this.generateVerificationToken(email)
        await this.mailService.sendConfirmationEmail(verificationToken.email, verificationToken.token)
        return true

    }


    private async generateVerificationToken(email: string) {
        const token = uuidv4()
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await this.prismaService.token.findFirst({
            where: {
                email,
                type: TOKEN_TYPE.VERIFICATION
            }
        })

        if (existingToken) {
            await this.prismaService.token.delete({
                where: {
                    id: existingToken.id,
                    type: TOKEN_TYPE.VERIFICATION
                }
            })
        }

        const verificationToken = await this.prismaService.token.create({
            data: {
                email,
                token,
                expiresIn,
                type: TOKEN_TYPE.VERIFICATION
            }
        })

        return verificationToken

    }

}
