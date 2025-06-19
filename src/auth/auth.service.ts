import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private userService: UserService) { }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync(refreshToken)
        if (!result) throw new UnauthorizedException('Невалидный refresh-токен')

        const user = await this.userService.getById(result.id)

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: AuthDto) {

        const { email, password, avatar, name } = dto

        const oldUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (oldUser) throw new BadRequestException('Пользователь уже существует')

        const user = await this.prisma.user.create({
            data: {
                email: email,
                avatar: faker.image.avatar(),
                name: name,
                // name: faker.person.firstName(),
                password: await hash(password)
            }
        })

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }

    }

    private async issueTokens(userId: (string | null)) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d'
        })

        return { accessToken, refreshToken }
    }

    private returnUserFields(user: User) {
        return {
            id: user.id,
            email: user.email
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new NotFoundException("User not found");

        const isValid = await verify(user.password, dto.password)
        if (!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }

    

}
