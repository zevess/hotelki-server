import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) { }

    async getById(id: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: id
            }
        })

        if (!user) {
            throw new Error("Пользователь не найден")
        }
        return user
    }

    async updateProfile(dto: AuthDto, userId: string) {

        const { name, avatar } = dto

        return this.prismaService.user.update({
            where: {
                id: userId
            }, data: {
                name: name,
                avatar: avatar
            }
        })
    }

}
