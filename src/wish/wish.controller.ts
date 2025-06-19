import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WishService } from './wish.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { WishDto } from './dto/wish.dto';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) { }

  @Get()
  async getAll() {
    return this.wishService.getAll()
  }

  @Get('by-id/:wishId')
  async getWishById(@Param('wishId') wishId: string) {
    return this.wishService.getById(wishId)
  }

  @Get('by-user/:userId')
  async getAllUserWishes(@Param('userId') userId: string) {
    return this.wishService.getByUserId(userId)
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @Auth()
  async createWish(@Body() dto: WishDto, @CurrentUser('id') id: string) {
    return this.wishService.create(dto, id)
  }

  @UsePipes(new ValidationPipe())
  @Patch('update/:wishId')
  @Auth()
  async updateWish(@Body() dto: WishDto, @Param('wishId') wishId: string) {
    return this.wishService.update(dto, wishId)
  }

  @Delete('delete/:wishId')
  @Auth()
  async deleteWish(@Param('wishId') wishId: string) {
    return this.wishService.delete(wishId)
  }

}
