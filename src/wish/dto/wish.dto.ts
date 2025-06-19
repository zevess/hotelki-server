import { WISH_PRIORITIES } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class WishDto {

    @IsString({ message: "Название должно быть строкой" })
    @IsNotEmpty({ message: "Название не должно быть пустым" })
    title: string

    @IsString({ message: "id события должно быть строкой" })
    @IsNotEmpty({ message: "id события не должно быть пустым" })
    eventId: string

    @IsNumber({}, { message: "Стоимость должна быть числом" })
    price: number

    @IsOptional()
    @IsString({ message: "Название должно быть строкой" })
    link: string

    @IsString({ message: "Эмодзи должно быть строкой" })
    emoji: string

    @IsEnum(WISH_PRIORITIES, {message: "Приоритет должен быть LOW, MEDIUM, HIGH или DREAM"})
    priority: WISH_PRIORITIES
}