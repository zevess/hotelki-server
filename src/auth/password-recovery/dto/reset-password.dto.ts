import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsEmail({}, { message: "email должен быть строкой" })
    @IsNotEmpty({ message: "Поле email не должно быть пустым" })
    email: string
}