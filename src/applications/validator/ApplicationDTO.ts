import { IsNotEmpty, IsNumber } from "@libs/core/validator";



export class ApplicationDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id:number

    @IsNotEmpty()
    @IsNumber()
    job_id:number
}