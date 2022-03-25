import { Job } from '@app/jobs/models';
import { BaseModel } from '@libs/core';

export class Application extends BaseModel {
  static tableName = 'applications';

  static relationMappings = {
    jobs: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: Job,
      join: {
        from : 'applications.jobId',
        to: 'jobs.id'
      }
    },
    users: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: __dirname+'../../../user/models/User',
      join: {
        from : 'applications.userId',
        to: 'users.id'
      }
    }
  }
}