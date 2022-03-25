import { UserDocument } from '../interface';
import { Transformer } from '@libs/core';

export class UserDetailTransformer extends Transformer {
  async transform(user: UserDocument): Promise<Record<string, any>> {
    let obj = {
      id: user.uuid,
      name: user.name,
      email:user.email,
      contact:user.contact,
      type:user.type,
      createdAt: user.createdAt,
    }
    if(user.access_token){
      obj['access_token'] = user.access_token;
    }
    return obj;
  }


}
