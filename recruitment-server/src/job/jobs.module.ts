import { Module } from '@nestjs/common';
import { JobResolver } from './jobs.resolver';
import { JobService } from './jobs.service';
import { GxrcService } from './gxrc.service';

@Module({
  providers: [JobResolver, JobService, GxrcService]
})
export class JobModule { }
