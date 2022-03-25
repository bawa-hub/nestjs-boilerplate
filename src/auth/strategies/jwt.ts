import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '@app/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  @Inject(UserService)
  private userservice: UserService;

  async validate(payload: JwtPayload) {
    return await this.userservice.find({ email: payload.email });
  }
}
