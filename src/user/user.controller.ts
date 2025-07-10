import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UpdateDto } from './dto/update.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('by-id/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getById(userId)
  }

  @Authorization()
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateDto, @Authorized('id') id: string) {
    return this.userService.updateProfile(dto, id)
  }


}
