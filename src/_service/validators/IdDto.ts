import { IsUUID} from "@libs/core/validator"


export class IdDTO {

    @IsUUID()
    id:string

}