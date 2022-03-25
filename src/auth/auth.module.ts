import { Module } from '@nestjs/common';
import { AuthController } from './controllers';
import { UserModule } from '../user';
import { AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
// import {MailService, EmailJobService } from '../_service/mails';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
