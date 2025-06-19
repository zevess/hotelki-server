import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EventDto } from './dto/event.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class EventService {
    constructor(private prismaService: PrismaService) { }


    async getAll(){
        return await this.prismaService.event.findMany()
    }

    async getById(eventId: string) {
        return await this.prismaService.event.findUnique({
            where: {
                id: eventId
            }
        })
    }

    async getByUserId(userId: string) {
        return await this.prismaService.event.findMany({
            where: {
                userId: userId
            }
        })
    }

    async create(dto: EventDto, userId: string) {
        const { title, date } = dto
        
        return await this.prismaService.event.create({
            data: {
                title: title,
                userId: userId,
                date: faker.date.future()
            }
        })

    }

    async update(dto: EventDto, id: string) {
        return await this.prismaService.event.update({
            where: {
                id
            }, data: {
                date: faker.date.future(),
                title: dto.title
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
