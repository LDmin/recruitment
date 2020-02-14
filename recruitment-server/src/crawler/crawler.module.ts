import { Module, Global } from '@nestjs/common';
import { CrawlerService } from './crawler.service'

@Global()
@Module({
  providers: [CrawlerService],
  exports: [CrawlerService],
})
export class CrawlerModule { }
