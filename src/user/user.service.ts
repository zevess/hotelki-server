import { Injectable } from '@nestjs/common';
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
            throw new Error("Пользователь не найден")
        }
        return user
    }

    async updateProfile(dto: UpdateDto, userId: string) {

        const { name } = dto

        return this.prismaService.user.update({
            where: {
                id: userId
            }, data: {
                name: name,
                // avatar: avatar
            }
        })
    }

}
