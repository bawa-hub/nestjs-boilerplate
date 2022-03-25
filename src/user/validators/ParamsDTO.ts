import { PaginateDTO } from "@app/_service/validators/paginateDTO";
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUnique } from "@libs/core/validator";

export class ParamsDTO extends PaginateDTO {
    @IsString()
    @IsOptional()
    name:string
    
    @IsString()
    @IsPhoneNumber('IN', {
        message: 'Please enter a valid phone number with country code',
      })
    @IsOptional()
    contact:string

}