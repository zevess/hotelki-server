import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';


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
            throw new NotFoundException("Пользователь не найден")
        }
        return user
    }

    async getByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new NotFoundException("Пользователь не найден")
        }
        return user
    }

    async updateProfile(dto: UpdateDto, userId: string) {

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
