import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class LoginDto {
    @IsEmail({}, { message: "Некорректный формат почты" })
    email: string

    
    @MinLength(6, {
        message: "Пароль должен быть не менее 6 символов"
    })
    @MaxLength(64, { message: "Пароль не более 64 символов" })
    @IsString()
    password: string
}