import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "@libs/core/validator";

export class LoginDTO{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}



