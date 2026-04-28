import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { cyrillicSlugify } from 'src/lib/utils/cyrillicSlugify';

@Injectable()
export class EventService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.event.findMany();
  }

  async getById(eventId: string, slug?: string) {
    return await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            isVerified: true,
            avatar: true,
            role: true,
          },
        },
      },
    });
  }

  async getByUserId(userId: string, slug?: string) {
    if (!slug) {
      return await this.prismaService.event.findMany({
        where: {
          userId: userId,
        },
        include: {
          wish: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              isVerified: true,
              avatar: true,
              role: true,
            },
          },
        },
      });
    }

    return await this.prismaService.event.findFirst({
      where: {
        userId: userId,
        slug: slug,
      },
      include: {
        wish: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            isVerified: true,
            avatar: true,
            role: true,
          },
        },
      },
    });
  }

  async create(dto: EventDto, userId: string) {
    const { title, date, emoji } = dto;

    return await this.prismaService.event.create({
      data: {
        title: title,
        userId: userId,
        date: date,
        emoji: emoji,
        slug: cyrillicSlugify(title),
      },
      include: {
        user: true,
      },
    });
  }

  async update(dto: EventDto, id: string) {
    const { title, date, emoji } = dto;
    return await this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        date: date,
        title: title,
        slug: cyrillicSlugify(title),
        emoji: emoji,
      },
      include: {
        user: true,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.wish.deleteMany({
      where: {
        eventId: id,
      },
    });

    return await this.prismaService.event.delete({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }
}
