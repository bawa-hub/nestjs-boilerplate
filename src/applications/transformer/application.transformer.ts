import { ApplicationDocument } from '@app/applications/interface';
import { Transformer } from '@libs/core';
import { JobsTransformer } from '../../jobs/transformer';
import { UserDetailTransformer } from '../../user/transformer';

export class ApplicationsTransformer extends Transformer {
  public defaultIncludes = [];
  public availableIncludes = ['jobs','users'];

  async transform(
    application: ApplicationDocument,
  ): Promise<Record<string, any> | null> {
    return {
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
    };
  }

  async includeUsers(
    application: ApplicationDocument,
  ): Promise<Record<string, any> | null> {
    if (application.users) {
      return await this.item(application.users, new UserDetailTransformer());
    }
    return undefined;
  }

  async includeJobs(
    application: ApplicationDocument,
  ): Promise<Record<string, any> | null> {
    if (application.jobs) {
      return await this.item(application.jobs, new JobsTransformer());
    }
    return undefined;
  }
}
