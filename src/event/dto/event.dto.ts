import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class EventDto{
    @IsString({message: "Название должно быть строкой"})
    @IsNotEmpty({message: "Название не должно быть пустым"})
    title: string

    @IsOptional()
    @IsDate({message: "Дата должна быть датой"})
    date: Date
}