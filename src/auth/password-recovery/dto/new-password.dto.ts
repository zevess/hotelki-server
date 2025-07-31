import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class NewPasswordtDto{
    @IsString({message: "Пароль должен быть строкой"})
    @MinLength(6, {message: "Пароль должен содержать не менее 6 символов"})
    @IsNotEmpty({message: "Пароль не должен быть пустым"})
    password: string
}