import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { WishService } from './wish.service';
import { WishDto } from './dto/wish.dto';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return this.wishService.getAll()
  }

  @Get('by-id/:wishId')
  @HttpCode(HttpStatus.OK)
  async getWishById(@Param('wishId') wishId: string) {
    return this.wishService.getById(wishId)
  }

  @Get('by-event/:eventId')
  @HttpCode(HttpStatus.OK)
  async getWishByEvent(@Param('eventId') eventId: string) {
    return this.wishService.getByEventId(eventId)
  }

  @Get('by-user/:userId')
  @HttpCode(HttpStatus.OK)
  async getAllUserWishes(@Param('userId') userId: string) {
    return this.wishService.getByUserId(userId)
  }

  @Get('by-user/:userId/:slug')
  @HttpCode(HttpStatus.OK)
  async getUserWishBySlug(@Param('userId') userId: string, @Param('slug') slug: string) {
    return this.wishService.getByUserId(userId, slug)
  }

  @Authorization()
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createWish(@Body() dto: WishDto, @Authorized('id') id: string) {
    return this.wishService.create(dto, id)
  }

  @Authorization()
  @Patch('update/:wishId')
  @HttpCode(HttpStatus.OK)
  async updateWish(@Body() dto: WishDto, @Param('wishId') wishId: string) {
    return this.wishService.update(dto, wishId)
  }

  @Authorization()
  @Delete('delete/:wishId')
  @HttpCode(HttpStatus.OK)
  async deleteWish(@Param('wishId') wishId: string) {
    return this.wishService.delete(wishId)
  }

}
