import { Injectable, Inject } from '@nestjs/common';
import { JobsArgs } from './dto/jobs.args';
import { Job } from './models/jobs';
import { CrawlerService } from 'src/crawler/crawler.service';
import JobFetchType from 'src/enums/JobFetchType';

@Injectable()
export class JobService {

  constructor(private readonly crawlerService: CrawlerService) { }


}
