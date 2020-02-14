import { Job } from './models/jobs'

export abstract class FetchJobsServie {
  abstract findAll(keyword: string): Promise<Job[]>
}