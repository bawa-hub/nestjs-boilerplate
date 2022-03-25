import { JobsService } from "@app/jobs/services";
import { UserDocument } from "@app/user/interface";
import { Injectable } from "@nestjs/common"



@Injectable()
export class HealthService{
    constructor(
        private jobservice:JobsService
    ){}

    async getjobs(user:UserDocument,inputs){
        return await this.jobservice.get(user,inputs)
    }
}