import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

    async getByUsername(username: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username
            }
        })

        if (!user) {
            throw new NotFoundException("Пользователь не найден")
        }
        return user
    }

    async findUser(slug: string) {
        const user = await this.prismaService.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: slug,
                            mode: 'insensitive'
                        }
                    },
                    {
                        name: {
                            contains: slug,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })

        if (!user) {
            throw new NotFoundException("Пользователь не найден")
        }
        return user
    }

    async updateProfile(dto: UpdateDto, userId: string) {
        const { name, avatar, username } = dto

        if (username) {
            const existingUser = await this.prismaService.user.findUnique({
                where: {
                    username
                }
            })

            if (existingUser && (existingUser.id !== userId)) {
                throw new ConflictException("Пользователь с таким ником уже есть")
            }
        }


        return this.prismaService.user.update({
            where: {
                id: userId
            }, data: {
                name,
                avatar,
                username
            }
        })
    }

}
