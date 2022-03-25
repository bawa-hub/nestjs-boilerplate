import { forwardRef, Module } from '@nestjs/common';
import { JobsService } from './services';
import { JobsController } from './controllers';
import { JOB_REPOSITORY } from './constants';
import { JobRepository } from './repositories';
import { UserModule } from '@app/user';
import { ApplicationsModule } from '@app/applications/applications.module';
// import {MailService } from '@app/_service/mails';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => ApplicationsModule)],
  providers: [
    JobsService,
    { provide: JOB_REPOSITORY, useClass: JobRepository },
  ],
  controllers: [JobsController],
  exports: [JobsService],
})
export class JobsModule {}
