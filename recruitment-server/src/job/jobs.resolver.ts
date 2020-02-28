import { Resolver, Query, Args, Subscription, Context } from '@nestjs/graphql';
import { Job } from './models/jobs';
import { JobsArgs } from './dto/jobs.args';
import { JobService } from './jobs.service';
import { GxrcService } from './gxrc.service';
import JobFetchType from 'src/enums/JobFetchType';
import { Inject } from '@nestjs/common';
import { PubSubService } from 'src/pub-sub/pub-sub.service';

@Resolver('Job')
export class JobResolver {

  @Inject(GxrcService)
  private readonly gxrcService: GxrcService

  @Inject(PubSubService)
  private readonly pubSubService: PubSubService

  constructor(private readonly jobService: JobService) { }

  // @Query(returns => [Job])
  // jobs(@Args() jobsArgs: JobsArgs): Promise<Job[]> {

  //   switch (jobsArgs.type) {
  //     case JobFetchType.GXRC: return this.gxrcService.findAll(jobsArgs.keyword);
  //     default: return this.gxrcService.findAll('nodejs');
  //   }
  // }

  @Subscription(returns => Job, {
    filter: (payload: { clientId: string, fetchId: string }, variables: JobsArgs) => {
      return (
        payload.clientId === variables.clientId
        && payload.fetchId === variables.fetchId
      )

    }
  })
  job(@Args() jobsArgs: JobsArgs) {
    console.log(jobsArgs.keyword);

    switch (jobsArgs.type) {
      case JobFetchType.GXRC: this.gxrcService.getJob(jobsArgs);
        break;
      default: this.gxrcService.getJobs('nodejs');
    }

    return this.pubSubService.pubSub.asyncIterator('job');
  }

  @Subscription(returns => [Job])
  jobs(@Args() jobsArgs: JobsArgs) {
    console.log(jobsArgs.keyword);

    switch (jobsArgs.type) {
      case JobFetchType.GXRC: this.gxrcService.getJobs(jobsArgs.keyword);
        break;
      default: this.gxrcService.getJobs('nodejs');
    }

    return this.pubSubService.pubSub.asyncIterator('jobs');
  }

  // 前端的订阅接口 
  @Subscription(returns => [Job])
  postupdated() {
    let times = 0
    setInterval(() => {
      this.pubSubService.pubSub.publish('postupdated', {
        postupdated: [
          { id: String(times), name: '111', detailUrl: 'detailUrl', company: 'company', pay: 'pay', address: 'address', updateAt: new Date() },
        ]
      });
      times++;
    }, 1000)
    return this.pubSubService.pubSub.asyncIterator('postupdated');
  }
}
