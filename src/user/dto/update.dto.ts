import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateDto {
    @IsEmail({}, { message: "Некорректный формат почты" })
    @IsOptional()
    email: string

    @IsString()
    @IsNotEmpty({ message: "Имя не должно быть пустым" })
    @IsOptional()
    name: string

    @IsString()
    @IsNotEmpty({ message: "Ссылка на аватар не должна быть пустой" })
    @IsOptional()
    avatar: string
}