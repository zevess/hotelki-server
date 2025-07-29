import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmationDto{
    @IsString({message: "Токен должен быть строкой"})
    @IsNotEmpty({message: "Поле токен не должно быть пустым"})
    token: string
}

// export class EmailConfirmationDto{
//     @IsString({message: "email должен быть строкой"})
//     @IsNotEmpty({message: "Поле email не должно быть пустым"})
//     email: string
// }