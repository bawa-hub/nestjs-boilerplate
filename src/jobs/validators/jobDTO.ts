import {IsString, Max, MaxLength} from "@libs/core/validator";


export class JobDTO{

    @IsString()
    @MaxLength(10000)
    desc:string

    @IsString()
    @MaxLength(255)
    title:string

    @IsString()
    @MaxLength(255)
    profile:string

    @IsString()
    company:string


}