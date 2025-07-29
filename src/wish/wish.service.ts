import { Injectable } from '@nestjs/common';

import { WishDto } from './dto/wish.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { cyrillicSlugify } from 'src/lib/utils/cyrillicSlugify';

@Injectable()
export class WishService {
    constructor(private prismaService: PrismaService) { }

    async getAll() {
        return await this.prismaService.wish.findMany()
    }

    async getById(wishId: string) {
        return await this.prismaService.wish.findUnique({
            where: {
                id: wishId
            }
        })
    }

    async getByUserId(userId: string, slug?: string) {
        if (!slug) {
            return await this.prismaService.wish.findMany({
                where: {
                    userId
                },
                include: {
                    event: true
                }
            })
        }

        return await this.prismaService.wish.findFirst({
            where: {
                userId: userId,
                slug: slug
            }
        })
    }

    async getByEventId(eventId: string) {
        return await this.prismaService.wish.findMany({
            where: {
                eventId
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
                emoji: emoji,
                slug: cyrillicSlugify(title)
            }
        })
    }

    async update(dto: WishDto, wishId: string) {
        const { title, price, priority, link, emoji, eventId } = dto

        return await this.prismaService.wish.update({
            where: {
                id: wishId
            }, data: {
                title: title,
                price: price,
                priority: priority,
                link: link,
                emoji: emoji,
                eventId: eventId,
                slug: cyrillicSlugify(title)
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
