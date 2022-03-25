import { USER_REPOSITORY } from '../constants';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryContract } from '../repositories';
import { ListensTo } from '@squareboat/nest-events';
import { UserSignedUp } from '../events/UserSignedUp';
import { ConfigService } from '@nestjs/config';
import { SearchUserDocument, UserDocument } from '../interface';
import { BaseValidator } from '@libs/core/validator';
import { UserDTO, ParamsDTO } from '../validators';
import { Command, _cli } from '@squareboat/nest-console';
import { hash } from '@libs/core/utils/Hash';
import { uuid } from '@libs/core';
import { AdminParamsDTO } from '../validators/AdminParamsDTO';
import { IdDTO } from '@app/_service/validators/IdDto';
import { UpdateUserDto } from '../validators/UpdateUserDTO';
import { JobsService } from '@app/jobs/services';
import { ApplicationService } from '@app/applications';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private users: UserRepositoryContract,
    private config: ConfigService,
    private validator: BaseValidator,
    private jobservice: JobsService,
    private applicationservice: ApplicationService,
  ) {}

  async add(user: UserDocument) {
    return this.users.create(user);
  }

  async find(user: UserDocument) {
    return this.users.firstWhere(user);
  }

  async update(where: UserDocument, value: UserDocument) {
    await this.users.updateWhere(where, value);
    return this.find(where);
  }

  async updateprofile(
    user: UserDocument,
    inputs: Record<string, any>,
  ): Promise<Record<string, any>> {
    await this.validator.fire(inputs, ParamsDTO);
    const newuser: UserDocument = {
      name: inputs.name ? inputs.name : user.name,
      contact: inputs.contact ? inputs.contact : user.contact,
    };
    return await this.update({ id: user.id }, newuser);
  }

  async get(inputs: Record<string, any>): Promise<Record<string, any>> {
    this.validator.fire(inputs, IdDTO);
    return await this.find({ uuid: inputs.id });
  }

  async updateuser(inputs: Record<string, any>): Promise<Record<string, any>> {
    this.validator.fire(inputs, UpdateUserDto);
    const olduser = await this.find({ uuid: inputs.id });
    const newuser = {
      name: inputs.name ? inputs.name : olduser.email,
      contact: inputs.contact ? inputs.contact : olduser.contact,
      status: inputs.status ? inputs.status : olduser.status,
    };
    return await this.update({ id: olduser.id }, newuser);
  }

  async deleteuser(inputs: Record<string, any>): Promise<boolean> {
    this.validator.fire(inputs, IdDTO);
    const userdetails = await this.users.firstWhere({ uuid: inputs.id });
    if (userdetails.type === this.config.get('settings.roles.candidate')) {
      this.applicationservice.deleteapplications({ user_id: userdetails.id });
    } else if (
      userdetails.type === this.config.get('settings.roles.recruiter')
    ) {
      await this.jobservice.deleteAllUserJobs(userdetails.id);
    }
    return await this.users.deleteWhere({ uuid: inputs.id });
  }

  async getusers(inputs: SearchUserDocument): Promise<Array<UserDocument>> {
    this.validator.fire(inputs, AdminParamsDTO);
    return await this.users.search(inputs);
  }

  // @ListensTo('USER_SIGNED_UP')
  // userSignedUp(event: UserSignedUp): void {
  //   console.log('EVENT RECEIVED ===>', event);
  //   // add your logic here
  //   return;
  // }
}
