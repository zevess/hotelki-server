import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WishDto } from './dto/wish.dto';

@Injectable()
export class WishService {
    constructor(private prismaService: PrismaService) { }

    async create(dto: WishDto, userId: string) {
        const { title, price, priority, link, eventId } = dto

        return await this.prismaService.wish.create({
            data: {
                userId: userId,
                eventId: eventId,
                title: title,
                priority: priority,
                link: link,
                price: price
            }
        })
    }
}
