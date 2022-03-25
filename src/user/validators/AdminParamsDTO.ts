import { ParamsDTO } from "@app/applications/validator";
import {IsIn,IsNotEmpty,IsNumber, IsOptional, IsString, IsUUID} from "@libs/core/validator";

export class AdminParamsDTO extends ParamsDTO {
    @IsOptional()
    @IsNumber()
    @IsIn([0,1])
    status:number

    @IsOptional()
    @IsNumber()
    @IsIn([1,2])
    type:number

}