import {Application} from '../../applications'
import {BaseModel} from '@libs/core';

export class Job extends BaseModel{
    static tableName='jobs'

    static relationMappings = {
        applications: {
          relation: BaseModel.HasManyRelation,
          modelClass: Application,
          join: {
            from: 'jobs.id',
            to : 'applications.jobId'
            
          }
        },
        users: {
          relation: BaseModel.BelongsToOneRelation,
          modelClass: __dirname+'../../../user/models/User',
          join: {
            from : 'jobs.userId',
            to: 'users.id'
          }
        }
      }
}