import { Application } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { ApplicationRepositoryContract } from '../contracts';
import { SearchApplicationDocument } from '@app/applications/interface';

@Injectable()
export class ApplicationRepository
  extends DB
  implements ApplicationRepositoryContract {
  @InjectModel(Application)
  model: Application;
  async search(inputs: SearchApplicationDocument) {
    const query = this.query();
    query.withGraphFetched('[jobs,users]');

    if (inputs.job_id) {
      query.joinRelated('jobs', { alias: 'jobs' });
      query.where('jobs.uuid', inputs.job_id);
    }

    if (inputs.user_id) {
      query.joinRelated('users', { alias: 'user' });
      query.where('user.uuid', inputs.user_id);
    }
    query.orderBy('createdAt','DESC')
    return await query.paginate(inputs.page, inputs.perPage);
  }
}
