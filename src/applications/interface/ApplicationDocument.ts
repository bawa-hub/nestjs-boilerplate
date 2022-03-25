import { JobDocument } from "@app/jobs/interface";
import { UserDocument } from "@app/user/interface";


export interface ApplicationDocument {
    id?: number;
    userId?:number;
    jobId?:number;
    users?: UserDocument;
    jobs?:JobDocument;
    createdAt?: Date;
    updatedAt?: Date
}

export interface SearchApplicationDocument {
    user_id?:string|number,
    job_id?:string|number,
    page?: number;
    perPage?: number;

}