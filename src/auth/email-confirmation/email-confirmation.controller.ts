import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { Request, Response } from 'express';
import { ConfirmationDto } from './dto/confirmation.dto';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}


  @Post()
  @HttpCode(HttpStatus.OK)
  public async newVerification(@Req() req: Request, @Res({ passthrough: true }) res: Response, @Body() dto: ConfirmationDto){
    return this.emailConfirmationService.newVerification(req, res, dto)
  }

  @Post("send-token")
  @HttpCode(HttpStatus.OK)
  public async sendToken(@Body("email") email: string){
    return this.emailConfirmationService.sendVerificationToken(email)
  }

}
