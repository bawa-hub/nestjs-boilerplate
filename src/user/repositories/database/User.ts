import { User } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { UserRepositoryContract } from '../contracts';
import { SearchUserDocument } from '@app/user/interface';

@Injectable()
export class UserRepository extends DB implements UserRepositoryContract {
  @InjectModel(User)
  model: User;
  search(inputs: SearchUserDocument) {
    const query = this.query();

    if (inputs.name) {
      query.where('name', inputs.name);
    }
    if (inputs.email) {
      query.where('email', inputs.email);
    }
    if (inputs.type) {
      query.where('type', inputs.type);
    }
    if (inputs.contact) {
      query.where('contact', inputs.contact);
    }
    if (inputs.status) {
      query.where('status', inputs.status);
    }
    query.where('type','>',0)
    query.orderBy('createdAt','DESC')
    return query.paginate(inputs.page, inputs.perPage);
  }
}
