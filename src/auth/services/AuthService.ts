import { hash, compare } from '@libs/core/utils/Hash';
import { BaseValidator } from '@libs/core/validator';
import {
  Injectable,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../../user';
import { RegiserDTO, LoginDTO, EmailDTO } from '../validator';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from '../strategies';
import { ConfigService } from '@nestjs/config';
// import { RedisService } from 'nestjs-redis';
// import { MailService } from '@app/_service/mails';
// import { Helper } from '@app/_support/helpers';
import { UserDocument } from '@app/user/interface';
import { ResetPasswordDTO } from '../validator/resetPasswordDTO';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UserService,
    private validator: BaseValidator,
    private jwtService: JwtService,
    private config: ConfigService, // private redisservice: RedisService, // private mail: MailService,
  ) {}

  async register(inputs: Record<string, any>) {
    await this.validator.fire(inputs, RegiserDTO);
    if (inputs.password !== inputs.confirmpassword) {
      throw new UnprocessableEntityException("Passwords doesn't match.");
    }
    let user: UserDocument = {
      uuid: uuidv4(),
      email: inputs.email,
      name: inputs.name,
      contact: inputs.contact,
      type: inputs.type,
      status: 1,
      password: await hash(inputs.password),
    };
    const res = await this.userservice.add(user);
    const payload: JwtPayload = { email: res.email, uuid: res.uuid };
    res.access_token = this.jwtService.sign(payload);
    return res;
  }

  async validateUser(inputs: Record<string, any>, option?: string) {
    await this.validator.fire(inputs, LoginDTO);
    const user = await this.userservice.find({ email: inputs.email });
    if (await compare(inputs.password, user.password)) {
      return user;
    } else {
      throw new NotFoundException('Email or password is incorrect');
    }
  }

  async login(inputs: Record<string, any>) {
    const user: UserDocument = await this.validateUser(inputs);
    if (user.type === this.config.get('settings.roles.admin')) {
      throw new UnauthorizedException(
        'You are not allowed to access this resource.',
      );
    }
    const payload: JwtPayload = { email: user.email, uuid: user.uuid };
    user.access_token = this.jwtService.sign(payload);
    return user;
  }

  async adminlogin(inputs: Record<string, any>) {
    const userdetails: UserDocument = await this.validateUser(inputs);
    if (userdetails.type == this.config.get('settings.roles.admin')) {
      const payload: JwtPayload = {
        email: userdetails.email,
        uuid: userdetails.uuid,
      };
      userdetails.access_token = this.jwtService.sign(payload);
      return userdetails;
    }
    throw new UnauthorizedException(
      'You are not allowed to access this resource.',
    );
  }

  // async forgetpassword(inputs: Record<string, any>) {
  //   await this.validator.fire(inputs, EmailDTO);
  //   const user :UserDocument= await this.userservice.find(inputs);

  //   const client = this.redisservice.getClient();
  //   if(await client.get(inputs.email)){
  //     return user
  //   }
  //   const key = Helper.randomString(20);
  //   client.set(user.email, key, 'EX', 60 * 30);
  //   await this.mail.resetpassword(user, key);
  //   return "Password reset link has been sent to your email."
  // }

  // async newPass(inputs: Record<string, any>) {
  //   await this.validator.fire(
  //     inputs,
  //     ResetPasswordDTO,
  //   );
  //   const client = this.redisservice.getClient();

  //   const key = await client.get(inputs.email);
  //   console.log(key!==inputs.key)
  //   if ((!key)||(key !== inputs.key)) {
  //     throw new NotFoundException('Link is expired');
  //   }
  //   client.del([inputs.email]);
  //   const user:UserDocument = await this.userservice.find({ email: inputs.email });
  //   const newuser = {
  //     password: await hash(inputs.password),
  //   };
  //   await this.userservice.update({id:user.id}, newuser);
  //   await this.mail.passwordchanged(user);
  //   return user;
  // }
}
