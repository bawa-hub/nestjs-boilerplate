export interface UserDocument {
    id?: number;
    uuid?: string;
    name?: string;
    email? :string;
    status?:number;
    type?:number;
    contact?:string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    access_token?:string
}

export interface SearchUserDocument {
    contact?:string;
    status?:number;
    type? : number;
    name?: string;
    email? :string
    page?: number;
    perPage?: number;

}