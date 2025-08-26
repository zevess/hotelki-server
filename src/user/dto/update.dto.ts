import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator"

export class UpdateDto {
    @IsEmail({}, { message: "Некорректный формат почты" })
    @IsOptional()
    email: string

    @IsString()
    @IsNotEmpty({ message: "Имя не должно быть пустым" })
    @IsOptional()
    name: string

    @IsString()
    @IsNotEmpty({ message: "Ник не должен быть пустым" })
    @IsOptional()
    @MinLength(2)
    @Matches(/^[a-zA-Z0-9._]+$/, { message: "Ник должен содержать только буквы, цифры и подчеркивания" })
    @Matches(/^\S*$/, { message: "Ник должен быть без пробелов" })
    username: string

    @IsString()
    @IsNotEmpty({ message: "Ссылка на аватар не должна быть пустой" })
    @IsOptional()
    avatar: string
}