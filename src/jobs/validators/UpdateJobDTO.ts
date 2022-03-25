import { PaginateDTO } from "@app/_service/validators/paginateDTO";
import {IsOptional, IsString, IsUUID } from "@libs/core/validator";


export class UpdateJobDTO extends PaginateDTO{
    @IsUUID()
    id:string

    @IsOptional()
    @IsString()
    title:string

    @IsOptional()
    @IsString()
    profile:string

    @IsOptional()
    @IsString()
    company:string

    @IsOptional()
    @IsString()
    desc:string

}