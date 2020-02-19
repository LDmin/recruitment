import { Job } from './models/jobs'

export abstract class FetchJobsServie {
  // abstract getJobs(keyword: string): Promise<Job[]>
  abstract getJobs(keyword: string): void
}