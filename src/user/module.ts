import { Module, HttpModule, forwardRef } from '@nestjs/common';
// import { UserController } from './controllers';
import { UserService } from './services';
import { USER_REPOSITORY } from './constants';
import { UserRepository } from './repositories';
import { CreateSuperAdmin } from './commands';
import { ConsoleModule } from '@squareboat/nest-console';
import { UserController } from './controllers';
import { ApplicationsModule } from '@app/applications/applications.module';
import { JobsModule } from '@app/jobs';

@Module({
  imports: [
    HttpModule,
    ConsoleModule,
    forwardRef(() => ApplicationsModule),
    JobsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    CreateSuperAdmin,
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
