import { uuid } from '@libs/core';
import { hash } from '@libs/core/utils/Hash';
import { Injectable } from '@nestjs/common';
import { Command, _cli } from '@squareboat/nest-console';
import { UserDocument } from '../interface';
import { UserService } from '../services';

@Injectable()
@Command('admin:create', { desc: 'Command to create an admin user' })
export class CreateSuperAdmin {
  constructor(private userservice: UserService) {}
  public async handle() {
    const name = await _cli.ask('What is your name?');
    const email = await _cli.ask('What is your email?');
    const contact = await _cli.ask('What is your contact no.?');
    const password = await hash(
      await _cli.password('Please enter your password'),
    );
    const user: UserDocument = {
      uuid: uuid(),
      name: name,
      email: email,
      password: password,
      type: 0,
      contact: contact, 
    };
    await this.userservice.add(user);

    _cli.success(`Hello ${name}, You have created an admin user😁`);
    _cli.info('Admin User Created');
  }
}
