import { PaginateDTO } from "@app/_service/validators/paginateDTO";
import { IsEmail, IsOptional, IsUUID } from "@libs/core/validator";

export class ParamsDTO extends PaginateDTO {
    @IsUUID()
    @IsOptional()
    job_id?:string

    @IsUUID()
    @IsOptional()
    user_id:string
}