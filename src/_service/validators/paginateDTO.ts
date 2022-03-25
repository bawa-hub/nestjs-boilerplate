import { IsNumber, IsOptional, Min } from "class-validator"
import { Transform } from "class-transformer"


export class PaginateDTO {

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    page=1

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Transform(({value})=>parseInt(value))
    perPage=10

}