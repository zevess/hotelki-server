import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: string){
    return this.userService.getById(id)
  }

  @Post('test')
  @Auth()
  async test(@Body() dto: AuthDto, @CurrentUser('id') id: string){
    return this.userService.testPost(dto, id)
  }
}
