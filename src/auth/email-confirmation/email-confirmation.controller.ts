import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { EmailConfirmationService } from './email-confirmation.service';
import { Response } from 'express';
import { ConfirmationDto } from './dto/confirmation.dto';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(private readonly emailConfirmationService: EmailConfirmationService) { }


  @Post()
  @HttpCode(HttpStatus.OK)
  public async newVerification(@Res({ passthrough: true }) res: Response, @Body() dto: ConfirmationDto) {
    return this.emailConfirmationService.newVerification(res, dto)
  }

  @Post("send-token")
  @HttpCode(HttpStatus.OK)
  public async sendToken(@Body("email") email: string) {
    return this.emailConfirmationService.sendVerificationToken(email)
  }

}
