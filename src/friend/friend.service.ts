import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendService {
  constructor(
    private prismaService: PrismaService,
    private eventService: EventService,
  ) {}

  async sendFriendRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) {
      throw new ConflictException('Нельзя добавить самого себя в друзья');
    }

    const existing = await this.prismaService.friends.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    if (existing) {
      throw new ConflictException('Заявка уже существует или вы уже друзья');
    }

    const newFriendRequest = await this.prismaService.friends.create({
      data: {
        senderId,
        receiverId,
        status: 'PENDING',
      },
    });

    return newFriendRequest;
  }

  async acceptFriendRequest(requestId: string, userId: string) {
    const request = await this.prismaService.friends.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }

    if (request.receiverId !== userId) {
      throw new ConflictException('Вы не можете принять эту заявку');
    }

    return this.prismaService.friends.update({
      where: {
        id: requestId,
      },
      data: {
        status: 'ACCEPTED',
      },
    });
  }

  async declineFriendRequest(requestId: string, userId: string) {
    const request = await this.prismaService.friends.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      throw new NotFoundException('Заявка не найдена');
    }

    return this.prismaService.friends.delete({
      where: {
        id: requestId,
      },
    });
  }

  async getFriends(userId: string) {
    const friends = await this.prismaService.friends.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            username: true,
            isVerified: true,
            avatar: true,
            role: true,
          },
        },
        receiver: {
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

    return friends.map((fr) =>
      fr.senderId === userId ? fr.receiver : fr.sender,
    );
  }

  async getIncomingRequests(userId: string) {
    return await this.prismaService.friends.findMany({
      where: {
        status: 'PENDING',
        receiverId: userId,
      },
      include: {
        sender: {
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

  async getOutgoingRequests(userId: string) {
    return await this.prismaService.friends.findMany({
      where: {
        status: 'PENDING',
        senderId: userId,
      },
      include: {
        receiver: {
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

  async getFriendsEvents(userId: string) {
    const friends = await this.getFriends(userId);
    const friendsIds = friends.map((obj) => obj.id);
    const promises = friendsIds.map(
      async (friendId) => await this.eventService.getByUserId(friendId),
    );
    const results = await Promise.all(promises);

    const events = results.flat();

    const now = new Date();
    const isoDateString = now.toISOString();

    const filteredDateEvents = events.filter(
      (item) => new Date(String(item?.date)) > new Date(isoDateString),
    );

    filteredDateEvents.sort(
      (a, b) =>
        new Date(String(a?.date)).getTime() -
        new Date(String(b?.date)).getTime(),
    );

    return filteredDateEvents;
  }

  async delete(userId: string, friendId: string) {
    const friendshipData = await this.prismaService.friends.findFirst({
      where: {
        status: 'ACCEPTED',
        OR: [
          {
            senderId: friendId,
            receiverId: userId,
          },
          {
            receiverId: friendId,
            senderId: userId,
          },
        ],
      },
    });

    await this.prismaService.friends.delete({
      where: {
        id: friendshipData?.id,
      },
    });
  }
}
