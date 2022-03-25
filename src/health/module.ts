import { JobsModule } from '@app/jobs';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './service';

@Module({
imports: [TerminusModule,JobsModule],
controllers: [HealthController],
providers:[HealthService]
})
export class HealthModule {}