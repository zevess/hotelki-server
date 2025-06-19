import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id)
  }

  @Get('by-id/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getById(userId)
  }

  @Patch('update')
  @Auth()
  async update(@Body() dto: AuthDto, @CurrentUser('id') id: string) {
    return this.userService.updateProfile(dto, id)
  }


}
