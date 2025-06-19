import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class AuthDto {
    @IsEmail({}, {message:"Некорректный формат почты"})
    email: string

    @IsString()
    @IsNotEmpty({message: "Имя не должно быть пустым"})
    @IsOptional()
    name: string

    @IsString({message: "Аватар должен быть ссылкой"})
    @IsOptional()
    avatar: string

    @MinLength(6, {
        message: "Пароль должен быть не менее 6 символов"
    })
    @MaxLength(64,{message: "Пароль не более 64 символов"})
    @IsString()
    password: string
}