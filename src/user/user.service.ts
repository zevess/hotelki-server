import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

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

    async testPost(dto: AuthDto, id: string) {
        return { dto, id }
    }

}
