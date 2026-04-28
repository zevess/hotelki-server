import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UpdateDto } from './dto/update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('by-id/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getById(userId);
  }

  @Get('by-username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getByUsername(username);
  }

  @Get('find/:slug')
  async findUser(@Param('slug') slug: string) {
    return this.userService.findUser(slug);
  }

  @Authorization()
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  async update(@Body() dto: UpdateDto, @Authorized('id') id: string) {
    return this.userService.updateProfile(dto, id);
  }
}
