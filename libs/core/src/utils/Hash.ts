import * as bcrypt from 'bcrypt';



export const hash =  async (str: string): Promise<string> => {
    return await bcrypt.hash(str, parseInt(process.env.BCRYPT_SALT));
}

export const compare = async (str:string,hash:string):Promise<boolean> =>{
    return await bcrypt.compare(str, hash);
}
