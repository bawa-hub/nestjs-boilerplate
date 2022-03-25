import { ApplicationService } from '@app/applications';
// import { MailService } from '@app/_service/mails';
import { UserService } from '@app/user';
import { uuid } from '@libs/core';
import { BaseValidator } from '@libs/core/validator';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JOB_REPOSITORY } from '../constants';
import { JobDocument, SearchJobDocument } from '../interface';
import { JobRepositoryContract } from '../repositories';
import { JobDTO, ParamsDTO, UpdateJobDTO } from '../validators';
import { IdDTO } from '@app/_service/validators/IdDto';
import { UserDocument } from '@app/user/interface';
import { ApplicationDocument } from '@app/applications/interface';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOB_REPOSITORY) private jobs: JobRepositoryContract,
    @Inject(forwardRef(() => UserService))
    private userservice: UserService,
    private validator: BaseValidator,
    @Inject(forwardRef(() => ApplicationService))
    private applicationservice: ApplicationService,
    private config: ConfigService, // private mail: MailService,
  ) {}

  async find(where: JobDocument): Promise<JobDocument> {
    return this.jobs.firstWhere(where);
  }

  async get(
    user: UserDocument,
    inputs: SearchJobDocument,
  ): Promise<Array<JobDocument>> {
    this.validator.fire(inputs, ParamsDTO);
    if (user.type === this.config.get('settings.roles.recruiter')) {
      return await this.jobs.search({ user_id: user.id });
    }
    if (user.type === this.config.get('settings.roles.candidate')) {
      const idList = await this.applicationservice.getappliedjobsIdList(user);
      return await this.jobs.search({ ...inputs, user_id: null }, idList);
    }
    return await this.jobs.search({ ...inputs, user_id: null });
  }

  async addjob(
    user: UserDocument, // $modal
    inputs: JobDocument,
  ): Promise<JobDocument> {
    await this.validator.fire(inputs, JobDTO);
    const job: JobDocument = {
      //JobDocument:- modal.
      uuid: uuid(),
      company: inputs.company,
      desc: inputs.desc,
      title: inputs.title,
      profile: inputs.profile,
    };
    const createdjob = await this.jobs.create(job); // sending repo(repo is predefined)
    await this.jobs.attach(createdjob, 'users', user.id);
    return createdjob;
  }

  async getjob(inputs: Record<string, any>): Promise<JobDocument> {
    this.validator.fire(inputs, IdDTO);
    return await this.find({ uuid: inputs.id });
  }

  async updatejob(
    user: UserDocument,
    inputs: Record<string, any>,
  ): Promise<JobDocument> {
    this.validator.fire(inputs, UpdateJobDTO);
    const job: JobDocument = await this.find({ uuid: inputs.id });
    if (
      user.id !== job.userId &&
      user.type !== this.config.get('settings.roles.admin')
    ) {
      throw new NotFoundException('Job record not found');
    }
    const value: JobDocument = {
      title: inputs.title ? inputs.title : job.title,
      desc: inputs.desc ? inputs.desc : job.desc,
      profile: inputs.profile ? inputs.profile : job.profile,
      company: inputs.company ? inputs.company : job.company,
    };
    await this.jobs.updateWhere({ id: job.id }, value);
    return await this.find({ id: job.id });
  }

  async deletejob(
    inputs: Record<string, any>,
    user: UserDocument,
  ): Promise<boolean> {
    this.validator.fire(inputs, IdDTO);
    const job: JobDocument = await this.find({ uuid: inputs.id });
    if (
      user.id !== job.userId &&
      user.type !== this.config.get('settings.roles.admin')
    ) {
      throw new UnauthorizedException();
    }
    this.applicationservice.deleteapplications({ job_id: job.id });
    return await this.jobs.deleteWhere({ id: job.id });
  }

  async postapplication(
    inputs: Record<string, any>,
    user: UserDocument,
  ): Promise<String> {
    const job: JobDocument = await this.getjob(inputs);
    await this.applicationservice.addapplication({
      user_id: user.id,
      job_id: job.id,
    });
    // await this.mail.jobappliedcandidate(user, job);
    // await this.mail.jobappliedrecruiter(
    //   user,
    //   job,
    //   await this.userservice.find({ id: job.userId }),
    // );
    return 'Job has been successfully applied';
  }

  async getappliedjobs(
    user: UserDocument,
    inputs: Record<string, any>,
  ): Promise<ApplicationDocument> {
    return await this.applicationservice.index({
      ...inputs,
      user_id: user.uuid,
    });
  }

  async getapplications(
    inputs: Record<string, any>,
    user: UserDocument,
  ): Promise<Array<ApplicationDocument>> {
    await this.validator.fire(inputs, IdDTO);
    const job: JobDocument = await this.getjob(inputs);
    inputs.job_id = job.uuid;
    if (
      job.userId !== user.id &&
      user.type !== this.config.get('setting.roles.admin')
    ) {
      throw new NotFoundException('Job not found.');
    }
    return await this.applicationservice.index(inputs);
  }

  // async deleteAllUserJobs(user_id: number) {
  //   if (await this.jobs.exists({ user_id: user_id })) {
  //     const jobs = await this.jobs.getWhere({ user_id: user_id });
  //     jobs.forEach(
  //       async (job: JobDocument) =>
  //         await this.applicationservice.deleteapplications({ job_id: job.id }),
  //     );
  //     return await this.jobs.deleteWhere({ user_id: user_id });
  //   } else return;
  // }
}
