import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EmailConfirmationDto {
    @IsEmail({}, { message: "email должен быть строкой" })
    @IsNotEmpty({ message: "Поле email не должно быть пустым" })
    email: string
}