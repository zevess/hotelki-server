import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { WishService } from './wish.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { WishDto } from './dto/wish.dto';

@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) { }

  @UsePipes(new ValidationPipe())
  @Post('create')
  @Auth()
  async createWish(@Body() dto: WishDto, @CurrentUser('id') id: string) {
    return this.wishService.create(dto, id)
  }
}
