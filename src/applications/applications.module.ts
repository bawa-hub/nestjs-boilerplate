import { forwardRef, Module } from '@nestjs/common';
import { ApplicationService } from './services';
import { ApplicationsController } from './controllers';
import { UserModule } from '@app/user';
import { APPLICATION_REPOSITORY } from './constants';
import { ApplicationRepository } from './repositories/database/Applications';
import { JobsModule } from '../jobs';
import { CoreModule } from '@libs/core';

@Module({
  imports: [CoreModule,forwardRef(()=>UserModule) , forwardRef(() => JobsModule)],
  providers: [ApplicationService,
    { provide: APPLICATION_REPOSITORY, useClass: ApplicationRepository }],
  controllers: [ApplicationsController],
  exports: [ApplicationService]
})
export class ApplicationsModule { }
