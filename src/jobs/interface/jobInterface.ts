import { UserDocument } from "@app/user/interface";
// $ MODAL
export interface JobDocument {
    id?: number;
    uuid?: string;
    company?: string;
    title?:string
    profile? :string;
    desc?: string;
    userId?:number;
    user?: UserDocument;
    createdAt?: Date;
    updatedAt?: Date
}

export interface SearchJobDocument {
    user_id? : number;
    profile? : string;
    company?: string;
    title?: string;
    page?: number;
    perPage?: number;

}