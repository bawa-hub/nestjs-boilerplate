import { SearchJobDocument } from "@app/jobs/interface";
import { UserDocument } from "@app/user/interface";
import { RepositoryContract } from "@libs/core";


export interface JobRepositoryContract extends RepositoryContract{
    search(inputs: SearchJobDocument,skippableIds?:Array<number>);
}