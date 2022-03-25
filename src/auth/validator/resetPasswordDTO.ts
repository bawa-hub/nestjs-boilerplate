import { IsNotEmpty, IsString, MaxLength, MinLength } from "@libs/core/validator";
import { LoginDTO } from "./loginDTO";




export class ResetPasswordDTO extends LoginDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(8)
    confirmpassword:string

    @IsString()
    @IsNotEmpty()
    key:string
}