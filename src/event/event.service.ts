import { Injectable } from '@nestjs/common';

import { EventDto } from './dto/event.dto';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';
import { cyrillicSlugify } from 'src/utils/cyrillicSlugify';

@Injectable()
export class EventService {
    constructor(private prismaService: PrismaService) { }


    async getAll() {
        return await this.prismaService.event.findMany()
    }

    async getById(eventId: string, slug?: string) {
        return await this.prismaService.event.findUnique({
            where: {
                id: eventId
            }
        })
    }

    async getByUserId(userId: string, slug?: string) {

        if (!slug) {
            return await this.prismaService.event.findMany({
                where: {
                    userId: userId
                },
                include: {
                    wish: true
                }
            })
        }

        return await this.prismaService.event.findFirst({
            where: {
                userId: userId,
                slug: slug
            },
            include:{
                wish: true
            }
        })

    }

    async create(dto: EventDto, userId: string) {
        const { title, date, emoji } = dto

        return await this.prismaService.event.create({
            data: {
                title: title,
                userId: userId,
                date: date,
                emoji: emoji,
                slug: cyrillicSlugify(title)
            }
        })

    }

    async update(dto: EventDto, id: string) {
        const { title, date, } = dto
        return await this.prismaService.event.update({
            where: {
                id
            }, data: {
                date: date,
                title: title,
                slug: cyrillicSlugify(title)
            }
        })
    }

    async delete(id: string) {
        await this.prismaService.event.delete({
            where: {
                id
            }
        })
    }

}
