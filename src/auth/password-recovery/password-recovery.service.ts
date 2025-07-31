import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TOKEN_TYPE } from '@prisma/client';
import { MailService } from 'src/lib/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid'
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordtDto } from './dto/new-password.dto';
import { hash } from 'argon2';

@Injectable()
export class PasswordRecoveryService {
    public constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly mailService: MailService
    ) { }

    public async resetPassword(dto: ResetPasswordDto) {
        const existingUser = await this.userService.getByEmail(dto.email)

        if (!existingUser) {
            throw new NotFoundException("Пользователь не найден")
        }

        const passwordResetToken = await this.generatePasswordResetToken(
            existingUser.email
        )

        await this.mailService.sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
        return true

    }

    public async newPassword(dto: NewPasswordtDto, token: string) {
        const existingToken = await this.prismaService.token.findFirst({
            where: {
                token,
                type: TOKEN_TYPE.PASSWORD_RESET
            }
        })

        if (!existingToken) {
            throw new NotFoundException("Токен не найден")
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
            where:{
                id: existingUser.id
            }, 
            data:{
                password: await hash(dto.password)
            }
        })

        await this.prismaService.token.delete({
            where:{
                id: existingToken.id,
                type: TOKEN_TYPE.PASSWORD_RESET
            }
        })

    }

    private async generatePasswordResetToken(email: string) {
        const token = uuidv4()
        const expiresIn = new Date(new Date().getTime() + 3600 * 1000)

        const existingToken = await this.prismaService.token.findFirst({
            where: {
                email,
                type: TOKEN_TYPE.PASSWORD_RESET
            }
        })

        if (existingToken) {
            await this.prismaService.token.delete({
                where: {
                    id: existingToken.id,
                    type: TOKEN_TYPE.PASSWORD_RESET
                }
            })
        }

        const passwordResetToken = await this.prismaService.token.create({
            data: {
                email,
                token,
                expiresIn,
                type: TOKEN_TYPE.PASSWORD_RESET
            }
        })

        return passwordResetToken

    }
}
