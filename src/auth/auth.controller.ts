import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto
  ) {
    return this.authService.register(res, dto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto
  ) {
    return this.authService.login(res, dto)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(req, res)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(res)
  }

  @Authorization()
  @Get("@me")
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return this.authService.validate(id);
  }


}
