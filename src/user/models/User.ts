// import { Application } from '@app/applications';
// import { Job } from '@app/jobs/models';
import { Role } from '@app/_support/enums/roles';
import { BaseModel } from '@libs/core';

export class User extends BaseModel {
  static tableName = 'users';
  roles: Role[];
  static relationMappings = {
    // jobs: {
    //   relation: BaseModel.HasManyRelation,
    //   modelClass: Job,
    //   join: {
    //     from : 'users.id',
    //     to: 'jobs.userId'
    //   }
    // },applications: {
    //   relation: BaseModel.HasManyRelation,
    //   modelClass: Application,
    //   join: {
    //     from : 'users.id',
    //     to: 'applications.userId'
    //   }
    // }
  };
}
