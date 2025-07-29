// import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
// import { MailService } from "./mail.service";
// import { EmailConfirmationService } from "src/auth/email-confirmation/email-confirmation.service";

// @Controller("mail")
// export class MailController {
//     constructor(
//         private readonly mailService: MailService,
//         private readonly emailConfirmationService: EmailConfirmationService
//     ) { }

//     @Post()
//     @HttpCode(HttpStatus.OK)
//     public async confirmEmail(@Body() email: string) {
//         return this.emailConfirmationService.sendVerificationToken(email)
//     }
// }
