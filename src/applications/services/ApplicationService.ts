import { UserService } from '@app/user';
import { UserDocument } from '@app/user/interface';
import { BaseValidator } from '@libs/core/validator';
import { ForbiddenException, forwardRef, Inject, Injectable} from '@nestjs/common';
import { application } from 'express';
import { APPLICATION_REPOSITORY } from '../constants';
import { ApplicationDocument, SearchApplicationDocument } from '../interface';
import { ApplicationRepositoryContract } from '../repositories/contracts';
import { ApplicationDTO, ParamsDTO} from '../validator';

@Injectable()
export class ApplicationService {
    constructor(
        @Inject(APPLICATION_REPOSITORY) private applications: ApplicationRepositoryContract,
        @Inject(forwardRef(()=>UserService))
        private userservice: UserService,
        private validator:BaseValidator,
    ) { }

    async deleteapplications(inputs:SearchApplicationDocument){
        if(inputs.user_id){
            if(await this.applications.exists({user_id:inputs.user_id}))
            return await this.applications.deleteWhere({user_id:inputs.user_id})
        }else{
            if(await this.applications.exists({job_id:inputs.job_id}))
            return await this.applications.deleteWhere({job_id:inputs.job_id})
        }
    }


    async getapplications( inputs: Record<string, any>): Promise<Array<ApplicationDocument>> {
        await this.validator.fire(inputs,ParamsDTO)
        return await this.applications.search(inputs)
    }



    async addapplication(application:Record<string,any>):Promise<ApplicationDocument> {
        await this.validator.fire(application,ApplicationDTO)
        if(await this.applications.exists(application)){
            throw new ForbiddenException()
        }
        return await this.applications.create(application)
    
        
    }

    async getappliedjobsIdList(user:UserDocument){
        if(!(await this.applications.exists({user_id:user.id}))){
            return
        }
        const applications = await this.applications.getWhere({user_id:user.id})
        let idList=[]
        for(let i=0;i<applications.length;i++){
            idList.push(applications[i].jobId)
        }
        return idList
    }

    async index(inputs:SearchApplicationDocument){
        return await this.applications.search(inputs)
    }
}
