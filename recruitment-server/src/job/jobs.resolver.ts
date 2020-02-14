import { Resolver, Query, Args } from '@nestjs/graphql';
import { Job } from './models/jobs';
import { JobsArgs } from './dto/jobs.args';
import { JobService } from './jobs.service';
import { GxrcService } from './gxrc.service';
import JobFetchType from 'src/enums/JobFetchType';
import { Inject } from '@nestjs/common';

@Resolver('Job')
export class JobResolver {

  @Inject(GxrcService)
  private readonly gxrcService: GxrcService

  constructor(private readonly jobService: JobService) { }

  @Query(returns => [Job])
  jobs(@Args() jobsArgs: JobsArgs): Promise<Job[]> {

    switch (jobsArgs.type) {
      case JobFetchType.GXRC: return this.gxrcService.findAll(jobsArgs.keyword);
      default: return this.gxrcService.findAll('nodejs');
    }
  }
}
