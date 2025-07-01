import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class EventDto {
    @IsString({ message: "Название должно быть строкой" })
    @IsNotEmpty({ message: "Название не должно быть пустым" })
    title: string

    @IsDate({ message: "Дата должна быть датой" })
    @Type(() => Date)
    date: Date

    @IsString({ message: "Эмодзи должно быть строкой" })
    @IsNotEmpty({ message: "Эмодзи не должно быть пустым" })
    emoji: string
}