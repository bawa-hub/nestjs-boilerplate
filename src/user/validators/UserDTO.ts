import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUnique, IsUUID } from "@libs/core/validator";

export class UserDTO {
    @IsEmail()
    @IsNotEmpty()
    @IsUnique({table: 'users', column: 'email' })
    email: string

    @IsString()
    @IsOptional()
    name:string
    
    @IsOptional()
    @IsNumber()
    type:number

}