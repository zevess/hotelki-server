import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WishDto } from './dto/wish.dto';

@Injectable()
export class WishService {
    constructor(private prismaService: PrismaService) { }

    async getAll(){
        return await this.prismaService.wish.findMany()
    }

    async getById(wishId: string) {
        return await this.prismaService.wish.findUnique({
            where: {
                id: wishId
            }
        })
    }

    async getByUserId(userId: string) {
        return await this.prismaService.wish.findMany({
            where: {
                userId: userId
            }
        })
    }

    async create(dto: WishDto, userId: string) {
        const { title, price, priority, link, emoji, eventId } = dto

        return await this.prismaService.wish.create({
            data: {
                userId: userId,
                eventId: eventId,
                title: title,
                priority: priority,
                link: link,
                price: price,
                emoji: emoji
            }
        })
    }

    async update(dto: WishDto, wishId: string) {
        const { title, price, priority, link, emoji } = dto

        return await this.prismaService.wish.update({
            where: {
                id: wishId
            }, data: {
                title: title,
                price: price,
                priority: priority,
                link: link,
                emoji: emoji
            }
        })
    }

    async delete(wishId: string) {
        await this.prismaService.wish.delete({
            where: {
                id: wishId
            }
        })
    }

}
