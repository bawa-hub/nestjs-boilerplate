import { InjectModel ,DatabaseRepository as DB} from "@libs/core";
import { Injectable } from "@nestjs/common";
import { JobRepositoryContract } from "../contracts";
import {Job} from '../../models'
import { SearchJobDocument } from "@app/jobs/interface";
import { UserDocument } from "@app/user/interface";



@Injectable()
export class JobRepository extends DB implements JobRepositoryContract{
    @InjectModel(Job)
    model:Job

    search(inputs: SearchJobDocument,skippableIds?:Array<number>){
        const query = this.query();

        if(inputs.company){
            query.where('company', inputs.company)
        }
        if(inputs.title){
            query.where('title', inputs.title)
        }
        if(inputs.profile){
            query.where('profile', inputs.profile)
        }
        if(inputs.user_id){
            query.where('user_id', inputs.user_id)
        }
        query.orderBy('createdAt','DESC')
        if(skippableIds){
            query.whereNotIn('id',skippableIds)
        }
        return query.paginate(inputs.page, inputs.perPage)
    }
}